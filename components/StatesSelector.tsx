'use client';

import { MultiSelect } from '@/components/ui/multi-select';
import { State } from '@/prisma/interfaces';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { updateUserStates } from '@/services/updateUserStates';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface StatesSelectorProps {
  states: State[];
  savedStatesIds: string[];
  userId: number;
}

// Server Component para seleccionar estados
const StatesSelector = ({
  states,
  savedStatesIds,
  userId,
}: StatesSelectorProps) => {
  const [originalStates, setOriginalStates] = useState(savedStatesIds);
  const [selectedStatesIds, setSelectedStatesIds] =
    useState<string[]>(savedStatesIds);
  const [savingStates, setSavingStates] = useState(false);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    // Compare the selected States with the saved States
    const isDifferent =
      selectedStatesIds.length !== originalStates.length ||
      selectedStatesIds.some((id: string) => !originalStates.includes(id));

    setIsModified(isDifferent);
  }, [selectedStatesIds, savedStatesIds]);

  const handleSave = async () => {
    setSavingStates(true);

    const res = await updateUserStates(userId, selectedStatesIds.map(Number));
    setSavingStates(false);

    if (res) {
      toast({
        title: 'States updated',
        description: 'Your States have been updated successfully',
        variant: 'default',
      });
      setIsModified(false);
      setOriginalStates(selectedStatesIds);
    } else {
      toast({
        title: 'Error updating States',
        description: 'Failed to update your States',
        variant: 'destructive',
      });
    }
  };

  const statesOptions = states.map((state) => ({
    value: state.id.toString(),
    label: state.name,
  }));

  const handleStateChange = (stateId: string[]) => {
    const newStates = states
      .filter((state) => stateId.includes(state.id.toString()))
      .map((state) => state.id.toString());
    setSelectedStatesIds(newStates);
  };

  return (
    <>
      <label htmlFor={'states'} className={'article-form_label'}>
        States
      </label>
      <div id={'states'} className={'article-form-container'}>
        <MultiSelect
          options={statesOptions}
          value={selectedStatesIds}
          onValueChange={handleStateChange}
          placeholder="Select states"
          maxCount={2}
        />
      </div>
      <div className={'flex justify-end mt-3'}>
        <Button
          className={'font-semibold text-white'}
          onClick={handleSave}
          disabled={!isModified || savingStates}
        >
          {savingStates && <Loader2 className="animate-spin" />}
          Save
        </Button>
      </div>
    </>
  );
};

export default StatesSelector;
