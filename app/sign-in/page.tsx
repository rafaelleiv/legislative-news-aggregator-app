import { signIn } from '@/auth';
import { Input } from '@/components/ui/input';
import React from 'react';
import { SendIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = (await searchParams) || {};

  return (
    <>
      <section className="pink_container !min-h-6">
        <h1 className={'sub-heading !text-2xl'}>
          Welcome to the Legislative News Aggregator
        </h1>

        <p className={'mt-5 text-14-normal'}>
          Log in with the user and password created for test
        </p>
      </section>

      <section className={'flex flex-col items-center section_container'}>
        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <form
            action={async (formData: FormData) => {
              'use server';

              // try {
                 await signIn('credentials', {
                  email: formData.get('email') as string,
                  password: formData.get('password') as string,
                });

                 // redirect('/');

              // } catch (error) {
              //   console.error('Error signing in', error);
              //   redirect(`/sign-in?error=${encodeURIComponent('Invalid Credentials')}`);
              // }
            }}
            noValidate
          >
            <div className="py-4">
              <center>
                <span className="text-26-semibold">Log In</span>
              </center>
            </div>

            <div>
              <label htmlFor={'email'} className={'article-form_label'}>
                Email
              </label>
              <Input
                name={'email'}
                id={'email'}
                className={'article-form_input'}
                placeholder={'Enter email'}
                required
                aria-label={'Enter email'}
              />
            </div>

            <div className={'mt-8'}>
              <label htmlFor={'password'} className={'article-form_label'}>
                Password
              </label>
              <Input
                name={'password'}
                id={'password'}
                type={'password'}
                className={'article-form_input'}
                placeholder={'Enter password'}
                required
                aria-label={'Enter password'}
              />
            </div>

            <Button type={'submit'} className={'article-form_btn mt-8 mb-3'}>
              <SendIcon className={'size-6'} />
              Submit
            </Button>

            {error && (
              <div className={'my-3'}>
                <p className="text-red-500 text-center mb-4">{error}</p>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
