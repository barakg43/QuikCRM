import { Badge, Box } from "@chakra-ui/react";

function BadgeIcon({
  icon,
  amountNotification = 0,
}: {
  icon: React.ReactNode;
  amountNotification?: number;
}) {
  return (
    <Box position='relative' justifyContent='center' alignContent='center'>
      {icon}
      {amountNotification > 0 && (
        <Badge
          position='absolute'
          top='0'
          right='0'
          borderRadius='full'
          transform='translate(30%,0)'
          padding='0.3rem'
          display='grid'
          placeItems='center'
          bg='teal.300'
          color='teal.900'
          fontSize='0.8rem'
          fontWeight='800'
        >
          {amountNotification}
        </Badge>
      )}
    </Box>
  );
}

export default BadgeIcon;
