/*
  Warnings:

  - A unique constraint covering the columns `[session_id,poll_id]` on the table `votes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "votes_session_id_poll_id_key" ON "votes"("session_id", "poll_id");
