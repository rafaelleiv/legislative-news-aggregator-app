'use client';

import React, { useEffect, useState } from 'react';
import { Topic } from '@/prisma/interfaces';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { updateUserTopics } from '@/services/updateUserTopics';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TopicsSelectorProps {
  topics: Topic[];
  savedTopicsIds: string[];
  userId: number;
}

const TopicsSelector: React.FC<TopicsSelectorProps> = ({
  topics,
  savedTopicsIds,
  userId,
}) => {
  const [originalTopics, setOriginalTopics] = useState(savedTopicsIds);
  const [selectedTopicsIds, setSelectedTopicsIds] =
    useState<string[]>(savedTopicsIds);
  const [savingTopics, setSavingTopics] = useState(false);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    // Compare the selected topics with the saved topics
    const isDifferent =
      selectedTopicsIds.length !== originalTopics.length ||
      selectedTopicsIds.some((id) => !originalTopics.includes(id));

    setIsModified(isDifferent);
  }, [selectedTopicsIds, savedTopicsIds]);

  const handleSave = async () => {
    setSavingTopics(true);

    const res = await updateUserTopics(userId, selectedTopicsIds.map(Number));
    setSavingTopics(false);

    if (res) {
      toast({
        title: 'Topics updated',
        description: 'Your topics have been updated successfully',
        variant: 'default',
      });
      setIsModified(false);
      setOriginalTopics(selectedTopicsIds);
    } else {
      toast({
        title: 'Error updating topics',
        description: 'Failed to update your topics',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <label htmlFor={'topics'} className={'article-form_label'}>
        Topics
      </label>
      <div id={'topics'} className={'article-form-container'}>
        <ToggleGroup
          type="multiple"
          className="flex flex-wrap justify-start"
          value={selectedTopicsIds}
          onValueChange={setSelectedTopicsIds}
        >
          {topics?.length > 0 &&
            topics.map((topic) => (
              <ToggleGroupItem
                key={topic.id}
                value={topic.id.toString()}
                aria-label={`Toggle ${topic.name}`}
              >
                <span
                  className={`topic-tag toggle-topic-tag ${
                    selectedTopicsIds.includes(topic.id.toString())
                      ? 'selected'
                      : ''
                  }`}
                >
                  {topic.name}
                </span>
              </ToggleGroupItem>
            ))}
        </ToggleGroup>
      </div>
      <div className={'flex justify-end mt-3'}>
        <Button
          className={'font-semibold text-white'}
          onClick={handleSave}
          disabled={!isModified || savingTopics}
        >
          {savingTopics && <Loader2 className="animate-spin" />}
          Save
        </Button>
      </div>
    </>
  );
};

export default TopicsSelector;
