import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Button,
  Heading,
  Hr,
  Img,
} from "@react-email/components";

interface VerificationEmailProps {
  verificationLink: string;
  userName: string;
}

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily: "'Arial', sans-serif",
  },
  container: {
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "580px",
  },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#333",
  },
  text: {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#51545E",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "200px",
    padding: "14px 7px",
    margin: "20px auto",
  },
  hr: {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  },
  footer: {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
  },
};

export default function VerificationEmail({
  verificationLink,
  userName,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Img
            src="../assets/logo.png"
            alt="JobBoard Logo"
            width={150}
            height={50}
          />
          <Heading style={styles.heading}>
            Welcome to JobBoard, {userName}!
          </Heading>
          <Text style={styles.text}>
            Thank you for joining our community of job seekers and employers. To
            get started, please verify your email address.
          </Text>
          <Button href={verificationLink} style={styles.button}>
            Verify Email
          </Button>
          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            JobBoard - Connecting talent with opportunities
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
