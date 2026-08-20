import { styled } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
// import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Root = styled("div")(({ theme }) => ({
  "& > .MuiIcon-root": {
    display: "block",
    margin: "0 auto 20px auto",
    color: theme.palette.secondary.main,
    fontSize: "5rem",
    width: "auto",
    textAlign: "center",
  },
  "& .name": {
    fontSize: 20,
    fontWeight: 400,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 20,
  },
  // description: { textAlign: 'justify' },
}));

interface SkillProps {
  iconClass?: string;
  name?: string;
  description?: string;
}

export default function Skill({
  iconClass = "far fa-lightbulb",
  name = "Skill",
  description = "I am awesome.",
}: SkillProps) {
  return (
    <Root>
      <Icon className={iconClass} />
      <Typography className="name">{name}</Typography>
      <Typography className="description">{description}</Typography>
    </Root>
  );
}
