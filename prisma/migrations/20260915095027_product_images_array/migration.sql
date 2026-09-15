-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imageUrl",
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
