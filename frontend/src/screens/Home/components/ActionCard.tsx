const ActionCard = ({
  title,
  icon,
  status = "basic",
}: {
  title: string;
  icon: any;
  status?: "basic" | "danger";
}) => (
  <Card style={styles.actionCard}>
    <Button appearance="ghost" status={status} accessoryTop={icon}>
      {title}
    </Button>
  </Card>
);
