import {
  styled,
  TextareaAutosize,
  useTheme as useMuiTheme,
  debounce,
} from '@mui/material';
import { useTheme } from './providers/ThemeProvider';
import { RootSelectors } from '@renderer/store/store';
import { useAppDispatch, useAppSelector } from '@renderer/store/hooks';
import { useEffect, useState, useRef } from 'react';

const StyledTextareaAutosize = styled(TextareaAutosize)`
  &::placeholder {
    @media print {
      opacity: 0;
    }
  }
`;

type Props = {
  selectors: RootSelectors;
  actions: any;
  className?: string;
  textSelector?: (state: any) => string;
  actionCreator?: (text: string) => any;
  placeholder?: string;
};

const Textarea: React.FC<Props> = ({
                                     selectors,
                                     actions,
                                     className,
                                     textSelector,
                                     actionCreator,
                                     placeholder = "Sem napíšte záver a zhodnotenie analýzy..."
                                   }) => {
  const theme = useMuiTheme();
  const { mode } = useTheme();
  const dispatch = useAppDispatch();

  const selectorToUse = textSelector ?? selectors.textEvaluation;
  const reduxText = useAppSelector(selectorToUse) || '';
  const [localText, setLocalText] = useState(reduxText);
  const debouncedDispatchRef = useRef(
    debounce((value: string) => {
      dispatch(actionCreator ? actionCreator(value) : actions.changeText(value));
    }, 500)
  );

  useEffect(() => {
    setLocalText(reduxText);
  }, [reduxText]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value ?? '';
    setLocalText(value);
    debouncedDispatchRef.current(value);
  };

  return (
    <StyledTextareaAutosize
      className={className}
      value={localText}
      onChange={handleChange}
      placeholder={placeholder}
      minRows={6}
      style={{
        fontSize: '16px',
        outline: 'none',
        borderRadius: '8px',
        padding: '8px',
        backgroundColor: theme.palette.background.paper,
        ...(mode === 'dark' && {
          border: 'none',
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))`,
          color: theme.palette.text.primary,
        }),
      }}
    />
  );
};

export default Textarea;