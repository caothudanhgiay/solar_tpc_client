import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/error-pages?type=not-found');
  }, [router]);

  return null;
}
