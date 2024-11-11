import { MultiSelect } from '@/components/ui/multi-select';
import { State } from '@/prisma/interfaces';

interface StatesSelectorProps {
  states: State[];
  selectedStates: State[];
  setSelectedStates: (states: State[]) => void;
  error?: string[] | string;
}

// Server Component para seleccionar estados
const StatesSelector = async ({
  states,
  selectedStates,
  setSelectedStates,
  error,
}: StatesSelectorProps) => {
  // const states = await getStates();

  const statesOptions = states.map((state) => ({
    value: state.id.toString(),
    label: state.name,
  }));

  const selectedStatesIds = selectedStates.map((state) => state.id.toString());

  const handleStateChange = (stateId: string[]) => {
    const newStates = states.filter((state) =>
      stateId.includes(state.id.toString())
    );
    setSelectedStates(newStates);
  };

  return (
    <div>
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
      {Array.isArray(error) ? (
        error.map((err, index) => (
          <p
            className={`article-form_error ${index > 0 ? '!-mt-1' : ''}`}
            key={index}
          >
            {err}
          </p>
        ))
      ) : (
        <p className={'article-form_error'}>{error}</p>
      )}
    </div>
  );
};

export default StatesSelector;
