const imagekit = require("../config/imagekit");

const uploadResume = async (fileBuffer, originalName = "resume.pdf") => {
  if (!Buffer.isBuffer(fileBuffer)) {
    throw new Error("Invalid resume file buffer");
  }

  if (!process.env.IMAGEKIT_PRIVATE_KEY) {
    throw new Error("ImageKit private key is missing from environment");
  }

  try {
    const safeFileName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");

    const result = await imagekit.upload({
      file: fileBuffer.toString("base64"),
      fileName: `${Date.now()}-${safeFileName}`,
      folder: "/jobboard/resumes",
      useUniqueFileName: true,
    });

    console.log("Resume uploaded successfully to ImageKit");

    return {
      url: result.url,
      fileId: result.fileId,
      name: result.name,
    };
  } catch (error) {
    console.error("ImageKit upload failed:", error.message);
    throw error;
  }
};

module.exports = uploadResume;