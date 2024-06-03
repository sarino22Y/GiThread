
import { getAuthSession } from '@/lib/auth';
import { getUserProfile } from '@/src/query/user.query';
import React from 'react'
import Profile from '../users/[userId]/Profile';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Post from '@/src/feature/post/Post';
import { buttonVariants } from '@/components/ui/button';
import clsx from 'clsx';

export default async function ProfilePage() {
  const session = await getAuthSession();
  if (!session?.user.id) {
    throw new Error('No user')
  }
  const user = await getUserProfile(session.user.id);
  if (!user) {
    notFound();
  }


  return (
    <div>
      <Profile user={user}>
      
        <Link href="/profile/edit" className={clsx(buttonVariants({
          variant: "outline",
        }), "mt-4")}>
          Modifier le profile
        </Link>
      </Profile>
      <div className='ml-10 divide-y divide-accent border-t border-accent mt-4'>
        {user.posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>

    </div>
  );
}
