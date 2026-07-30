-- CreateTable
CREATE TABLE "resume_requests" (
    "id" SERIAL NOT NULL,
    "targetJobRole" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "resumeUrl" TEXT NOT NULL,
    "resumePublicId" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Processing',
    "aiResponse" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "resume_requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "resume_requests" ADD CONSTRAINT "resume_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
