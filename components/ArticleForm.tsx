'use client';

import React, { useActionState, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { State, Topic } from '@/prisma/interfaces';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { SendIcon } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { MultiSelect } from '@/components/ui/multi-select';
import { toast } from '@/hooks/use-toast';
import { InputArticle, postArticle } from '@/services/postArticle';
import { useRouter } from 'next/navigation';

const ArticleForm = ({
  topics,
  states,
}: {
  topics: Topic[];
  states: State[];
}) => {
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const statesValues: {
    value: string;
    label: string;
  }[] = states.map((state) => ({
    value: state.id.toString(),
    label: state.name,
  }));

  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
      console.log('entered to handle submit');
      const formValues = {
        title: formData.get('title') as string,
        summary: formData.get('summary') as string,
        topics: selectedTopics.map(
          (topicId) =>
            topics.find((topic) => topic.id.toString() === topicId) as Topic
        ),
        states: selectedStates.map(
          (stateId) =>
            states.find((state) => state.id.toString() === stateId) as State
        ),
        image: formData.get('image') as string,
        link: formData.get('link') as string,
        publishedAt: new Date(),
      };

      console.log(formValues);

      await formSchema.parseAsync(formValues);

      const result = await postArticle(formValues as InputArticle);
      if (result.status === 201) {
        toast({
          title: 'Article created',
          description: 'The article has been created successfully',
        });

        setSelectedStates([]);
        setSelectedTopics([]);

        router.push(`/news/${result.data.slug}`);

        return {
          ...prevState,
          status: 'SUCCESS',
        };
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: 'Validation failed',
          description: 'Please check the form for errors',
          variant: 'destructive',
        });

        return {
          ...prevState,
          error: 'Validation failed',
          status: 'ERROR',
        };
      }

      toast({
        title: 'Unexpected error',
        description: 'An unexpected error occurred while creating the article',
        variant: 'destructive',
      });

      return {
        ...prevState,
        error: 'Unexpected error creating article',
        status: 'ERROR',
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, {});

  return (
    <form action={formAction} className={'article-form'} noValidate>
      <div>
        <label htmlFor={'title'} className={'article-form_label'}>
          Title
        </label>
        <Input
          name={'title'}
          id={'title'}
          className={'article-form_input'}
          placeholder={'Enter title'}
          required
          aria-label={'Enter title'}
        />
        {Array.isArray(errors.title) ? (
          errors.title.map((error, index) => (
            <p
              className={`article-form_error ${index > 0 ? '!-mt-1' : ''}`}
              key={index}
            >
              {error}
            </p>
          ))
        ) : (
          <p className={'article-form_error'}>{errors.title}</p>
        )}
      </div>
      <div>
        <label htmlFor={'summary'} className={'article-form_label'}>
          Summary
        </label>
        <Textarea
          name={'summary'}
          id={'summary'}
          className={'article-form_textarea'}
          placeholder={'Enter summary'}
          required
          aria-label={'Enter summary'}
        />
        {Array.isArray(errors.summary) ? (
          errors.summary.map((error, index) => (
            <p
              className={`article-form_error ${index > 0 ? '!-mt-1' : ''}`}
              key={index}
            >
              {error}
            </p>
          ))
        ) : (
          <p className={'article-form_error'}>{errors.summary}</p>
        )}
      </div>
      <div>
        <label htmlFor={'topics'} className={'article-form_label'}>
          Topics
        </label>
        <div id={'topics'} className={'article-form-container'}>
          <ToggleGroup
            type="multiple"
            className="flex flex-wrap justify-start"
            value={selectedTopics}
            onValueChange={setSelectedTopics}
          >
            {topics?.length > 0 &&
              topics.map((topic) => (
                <ToggleGroupItem
                  key={topic.id}
                  value={topic.id.toString()}
                  aria-label={`Toggle ${topic.name}`}
                >
                  <span
                    className={`topic-tag toggle-topic-tag ${selectedTopics.includes(topic.id.toString()) ? 'selected' : ''}`}
                  >
                    {topic.name}
                  </span>
                </ToggleGroupItem>
              ))}
          </ToggleGroup>
        </div>
        {Array.isArray(errors.topics) ? (
          errors.topics.map((error, index) => (
            <p
              className={`article-form_error ${index > 0 ? '!-mt-1' : ''}`}
              key={index}
            >
              {error}
            </p>
          ))
        ) : (
          <p className={'article-form_error'}>{errors.topics}</p>
        )}
      </div>
      <div>
        <label htmlFor={'states'} className={'article-form_label'}>
          States
        </label>
        <div id={'states'} className={'article-form-container'}>
          <MultiSelect
            options={statesValues}
            value={selectedStates}
            onValueChange={setSelectedStates}
            placeholder="Select states"
            maxCount={2}
          />
        </div>
        {Array.isArray(errors.states) ? (
          errors.states.map((error, index) => (
            <p
              className={`article-form_error ${index > 0 ? '!-mt-1' : ''}`}
              key={index}
            >
              {error}
            </p>
          ))
        ) : (
          <p className={'article-form_error'}>{errors.states}</p>
        )}
      </div>
      <div>
        <label htmlFor={'image'} className={'article-form_label'}>
          Image url
        </label>
        <Input
          type={'url'}
          name={'image'}
          id={'image'}
          className={'article-form_input'}
          placeholder={'Enter image link'}
          required
          aria-label={'Enter image link'}
        />
        {Array.isArray(errors.image) ? (
          errors.image.map((error, index) => (
            <p
              className={`article-form_error ${index > 0 ? '!-mt-1' : ''}`}
              key={index}
            >
              {error}
            </p>
          ))
        ) : (
          <p className={'article-form_error'}>{errors.image}</p>
        )}
      </div>
      <div>
        <label htmlFor={'link'} className={'article-form_label'}>
          Link
        </label>
        <Input
          name={'link'}
          id={'link'}
          className={'article-form_input'}
          placeholder={'Enter source link'}
          required
          aria-label={'Enter source link'}
        />
        {Array.isArray(errors.link) ? (
          errors.link.map((error, index) => (
            <p
              className={`article-form_error ${index > 0 ? '!-mt-1' : ''}`}
              key={index}
            >
              {error}
            </p>
          ))
        ) : (
          <p className={'article-form_error'}>{errors.link}</p>
        )}
      </div>

      <Button
        type={'submit'}
        className={'article-form_btn'}
        disabled={isPending}
      >
        <SendIcon className={'size-6'} />
        {isPending ? 'Submiting...' : 'Submit'}
      </Button>
    </form>
  );
};
export default ArticleForm;
