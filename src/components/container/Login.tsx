'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, TLoginSchema } from '@/lib/validations/auth_validations';
import { toast } from 'sonner';
import { useAuth } from '@/lib/context/auth_context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

// Shadcn UI
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';

const LOGO_PATH = '/Vector.png';
const LOGO_SIZE = 24;

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: TLoginSchema) => {
    const userData = {
      id: Date.now().toString(),
      username: data.username,
      email: '',
      hasStore: false,
      storeName: null,
    };
    login(userData); // login ini akan set isManualLogin = true
    toast.success('Login berhasil 🎉');
    form.reset();
    router.push('/05_home/beforestore'); // client-side redirect
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
      <Card className='w-full max-w-sm rounded-xl border-none bg-white shadow-lg'>
        <CardContent className='p-8'>
          <div className='mb-6 flex items-center'>
            <Image
              src={LOGO_PATH}
              alt='Shirt Logo'
              width={LOGO_SIZE}
              height={LOGO_SIZE}
              className='mr-2'
            />
            <span className='text-xl font-semibold text-black'>Shirt</span>
          </div>

          <h1 className='mb-1 text-2xl font-bold text-black'>Login</h1>
          <p className='mb-6 text-sm text-gray-500'>
            Access your account and start shopping in seconds
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <div>
              <Input
                type='text'
                id='username'
                placeholder='Username (ex: kminchelle)'
                className='h-11 rounded-lg border border-gray-300 px-3 py-2 text-sm focus-visible:ring-black focus-visible:ring-offset-0'
                {...form.register('username')}
              />
              {form.formState.errors.username && (
                <p className='mt-1 text-xs text-red-500'>
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>

            <div className='relative'>
              <Input
                type={showPassword ? 'text' : 'password'}
                id='password'
                placeholder='Password (ex: 0lelplR)'
                className='h-11 rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus-visible:ring-black focus-visible:ring-offset-0'
                {...form.register('password')}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600'
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className='h-5 w-5' />
                ) : (
                  <Eye className='h-5 w-5' />
                )}
              </button>
              {form.formState.errors.password && (
                <p className='mt-1 text-xs text-red-500'>
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type='submit'
              className='mt-2 h-11 w-full rounded-lg bg-black text-base font-medium text-white hover:bg-gray-800'
            >
              Login
            </Button>
          </form>

          <div className='mt-6 text-center text-sm text-gray-500'>
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/02_register')}
              className='cursor-pointer font-semibold text-black hover:text-gray-800'
            >
              Register
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
