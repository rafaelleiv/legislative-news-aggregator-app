'use client';

import React, { useEffect, useState } from 'react';
import { Topic } from '@/prisma/interfaces';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { updateUserTopics } from '@/services/updateUserTopics';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useSession } from '@/app/context/SessionContext';

interface TopicsSelectorProps {
  topics: Topic[];
  savedTopicsIds: string[];
}

const TopicsSelector: React.FC<TopicsSelectorProps> = ({
  topics,
  savedTopicsIds,
}) => {
  const { session } = useSession();
  if (!session || !session.id) {
    throw new Error('User is not authenticated');
  }

  const [selectedTopicsIds, setSelectedTopicsIds] =
    useState<string[]>(savedTopicsIds);
  const [savingTopics, setSavingTopics] = useState(false);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    // Compare the selected topics with the saved topics
    const isDifferent =
      selectedTopicsIds.length !== savedTopicsIds.length ||
      selectedTopicsIds.some((id) => !savedTopicsIds.includes(id));

    setIsModified(isDifferent);
  }, [selectedTopicsIds, savedTopicsIds]);

  const handleSave = async () => {
    setSavingTopics(true);

    const res = await updateUserTopics(
      session.id!,
      selectedTopicsIds.map(Number)
    );
    setSavingTopics(false);
  };

  return (
    <div>
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
    </div>
  );
};

export default TopicsSelector;
