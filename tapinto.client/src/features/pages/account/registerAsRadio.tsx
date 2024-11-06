import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

export default function RegisterAsRadio() {
    return (<>
        <RadioGroup defaultValue="Student" orientation='horizontal'>
            {["Student", "Teacher"].map((item) => (
                <Radio key={item} value={item} label={item} color="neutral" />
            ))}
        </RadioGroup></>
    );
}