-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_workoutId_fkey";

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
