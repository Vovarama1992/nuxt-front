import { User } from 'grammy/types';

export function getProfileName(user: User): string {
  let name = user.username || user.first_name;
  if (user.last_name && !user.username) name += ' ' + user.last_name;
  return name;
}
