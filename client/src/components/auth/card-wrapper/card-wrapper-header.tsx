import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type CardWrapperHeaderProps = {
  withLogo?: boolean;
  title: string;
  description?: string;
};

const CardWrapperHeader: React.FC<CardWrapperHeaderProps> = ({
  title,
  description,
  withLogo,
}) => (
  <CardHeader className="p-2 mb-11">
    <div className="flex flex-col gap-0">
      {/* {withLogo && (
        <div className="w-16 h-16 relative p-0 m-0">
          <Image src={Logo} alt="logo" priority fill />
        </div>
      )} */}
      <CardTitle className="text-4xl text-left font-bold text-primary">
        {title}
      </CardTitle>
    </div>
    {description && <CardDescription>{description}</CardDescription>}
  </CardHeader>
);

export default CardWrapperHeader;
