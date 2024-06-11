import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Sheet } from '@mui/joy';

export default function Bio() {
  return (
    <Card
      sx={{
        width: 320,
        maxWidth: '100%',
        boxShadow: 'sm',
      }}
    >
      <CardContent sx={{ justifyContent:"center", textAlign: 'center' }}>
        <Avatar src="/static/images/avatar/1.jpg" sx={{ '--Avatar-size': '4rem' }} />
        <Typography level="title-lg">Meshack Mlangeni</Typography>
        <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
          Hello, this is my bio and I am a PRO member of MUI. I am a developer and I
          love to code.
        </Typography>
        <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              mt:1,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Posts
              </Typography>
              <Typography fontWeight="lg">00</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Groups
              </Typography>
              <Typography fontWeight="lg">00</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Rating
              </Typography>
              <Typography fontWeight="lg">0.0</Typography>
            </div>
          </Sheet>
      </CardContent>
    </Card>
  );
}
