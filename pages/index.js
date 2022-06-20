import Layout from "../layout";
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { Spin, Alert } from 'antd';
import { useUser } from "../context/userContext";

export default function Home() {
  const { user, verify } = useUser();
  const router = useRouter();


  useEffect(() => {
    verify().then(user => {

      console.log("user=", user);

      if (user?.role === 'member') {
        router.push('/member');

      } else if (user?.role === 'admin') {
        router.push('/admin')

      } else if (user?.role === 'librarian') {
        router.push('/librarian')

      } else if (user?.role === 'teacher') {
        router.push('/teacher')
      }
    })
  }, [])


  return (
    <div className='text-center' style={{ marginTop: '10%' }}>
      <Spin tip="Loading..." size="large">
      </Spin>
      <h1 className='font-bold text-xl mt-5 tracking-widest'>Welcome</h1>
    </div>

  );
}
