import axios from "axios";

interface User {
  id: string;
  userName: string;
  name: string | null;
}

interface DefaultOption {
  name: string;
  property: string;
  value: number;
  range: {
    min: number;
    max: number;
  };
  unit: string;
  defaultValue: number;
}

interface Property {
  scale: number;
  type: string;
  DEFAULT_OPTIONS: DefaultOption[];
}

interface ArrayOfUrlObjects {
  idx: number;
  url: string;
  type: string;
}

interface handlePostUploadProps {
  user: User;
  files: FileList | null;
  propertList: Property[];
  postDescription: string;
}


export const handlePostUpload = async ({
  user,
  files,
  propertList,
  postDescription
}: handlePostUploadProps) => {
  try {
    if (!user) return;
    if (!files) return;
    const typeOfMedia: string[] = propertList.map((fileProperty) => {
      return fileProperty.type;
    });
    const postGenerationResponse = await axios.post(
      `http://localhost:4000/api/upload/post/${user.id}`,
      {
        numberOfPost: files.length,
        description: postDescription,
        typeOfPost: "IMAGE",
        typeOfMedia: typeOfMedia
      }
    );
    if (postGenerationResponse.status === 200) {
      const ArrayOfUrl: ArrayOfUrlObjects[] =
        postGenerationResponse.data.ArrayOfUrl;

      if (ArrayOfUrl.length < 1) return;
      ArrayOfUrl.sort((a, b) => a.idx - b.idx);
      console.log(ArrayOfUrl);

      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      for (let i = 0; i < files.length; i++) {
        const img = new Image();
        const UrlThatWillBeDrawn = URL.createObjectURL(files[i]);
        img.src = UrlThatWillBeDrawn;
        console.log(UrlThatWillBeDrawn);

        await new Promise<void>((resolve) => {
          img.onload = () => {
            const canvasAspectRatio = canvas.width / canvas.height;
            const imageAspectRatio = img.width / img.height;

            let drawWidth, drawHeight, offsetX, offsetY;
            const scale = propertList[i].scale;

            if (canvasAspectRatio > imageAspectRatio) {
              drawWidth = canvas.width * scale;
              drawHeight = drawWidth / imageAspectRatio;
              offsetX = (canvas.width - drawWidth) / 2;
              offsetY = (canvas.height - drawHeight) / 2;
            } else {
              drawHeight = canvas.height * scale;
              drawWidth = drawHeight * imageAspectRatio;
              offsetX = (canvas.width - drawWidth) / 2;
              offsetY = (canvas.height - drawHeight) / 2;
            }

            const filters = propertList[i].DEFAULT_OPTIONS.map((option) => {
              if (option.name === "Vignette") return "";
              return `${option.property}(${option.value}${option.unit})`;
            });

            const filter = filters.join(" ");

            const radialGradient = ctx.createRadialGradient(
              canvas.width / 2,
              canvas.height / 2,
              0,
              canvas.width / 2,
              canvas.height / 2,
              Math.abs(Math.max(canvas.width, canvas.height) / 2)
            );

            radialGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
            radialGradient.addColorStop(
              1,
              `rgba(0, 0, 0, ${propertList[i].DEFAULT_OPTIONS[7].value / 100})`
            );

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = filter;
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

            ctx.fillStyle = radialGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(UrlThatWillBeDrawn);

            canvas.toBlob(async (blob) => {
              if (blob) {
                const formData = new FormData();
                formData.append("file", blob);
                formData.append("fileId", ArrayOfUrl[i].url);
                const imageUploadingResponse = await axios.post(
                  `http://localhost:8000/api/upload/post`,
                  formData
                );
                if (imageUploadingResponse.status === 200) {
                  console.log(imageUploadingResponse);
                }
              }
              resolve();
            }, "image/png");
          };
        });
      }
    }
  } catch (error: any) {
    console.log(error.message);
  }
};
