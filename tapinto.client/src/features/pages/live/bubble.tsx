import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { MessageProps } from '../types';

type BubbleProps = MessageProps & {
    variant: 'sent' | 'received';
};

export default function Bubble(props: BubbleProps) {
    const { content, variant, timestamp, sender } = props;
    const isSent = variant === 'sent';
    return (
        <Box sx={{ maxWidth: '100%' }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={2}
                sx={{ mb: 0.25 }}
            >
                <Typography level="body-xs">
                    {sender === 'You' ? sender : sender.name}
                </Typography>
                <Typography level="body-xs">{timestamp}</Typography>
            </Stack>
            <Box
                sx={{ position: 'relative' }}
            >
                <Sheet
                    color={isSent ? 'primary' : 'neutral'}
                    variant={isSent ? 'solid' : 'soft'}
                    sx={{
                        p: 1.25,
                        borderRadius: 'lg',
                        boxShadow: "sm",
                        borderTopRightRadius: isSent ? 0 : 'lg',
                        borderTopLeftRadius: isSent ? 'lg' : 0,
                        backgroundColor: isSent
                            ? 'var(--joy-palette-primary-solidBg)'
                            : 'white',
                    }}
                >
                    <Typography
                        level="body-sm"
                        sx={{
                            color: isSent
                                ? 'var(--joy-palette-common-white)'
                                : 'var(--joy-palette-common-black)',
                        }}
                    >
                        {content}
                    </Typography>
                </Sheet>
            </Box>
        </Box>
    );
}
