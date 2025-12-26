import type { User } from "@/types/user";
//게시글의 user-id와 실제 user를 매치하는 함수

export function buildUsersById(users: User[]) {
  return Object.fromEntries(users.map((u) => [u.id, u])) as Record<string, User>;
}
