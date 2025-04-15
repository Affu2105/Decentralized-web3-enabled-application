import * as React from "react";
import { motion } from "framer-motion";
import { Shield, Wallet, EyeOff, Globe, Lock, CheckCircle, UserCheck } from "lucide-react";

const reasons = [
  {
    icon: <EyeOff className="h-12 w-12 text-[#F213A4]" />,
    title: "Stay Anonymous",
    description:
      "Speak up without revealing your identity. Your wallet is your voice — no names, no fear.",
  },
  {
    icon: <Shield className="h-12 w-12 text-[#9B55FF]" />,
    title: "Privacy First",
    description:
      "We never track or store personal data. Your complaints and activity remain strictly confidential.",
  },
  {
    icon: <Globe className="h-12 w-12 text-[#33BBFF]" />,
    title: "Built on Transparency",
    description:
      "Every complaint, every donation — permanently recorded on the blockchain. Nothing hidden. Nothing lost.",
  },
  {
    icon: <UserCheck className="h-12 w-12 text-[#F213A4]" />,
    title: "Truly Decentralized",
    description:
      "No middlemen. No gatekeepers. The platform is powered by smart contracts and your community.",
  },
  {
    icon: <Lock className="h-12 w-12 text-[#9B55FF]" />,
    title: "Secure & Untouchable",
    description:
      "Blockchain tech ensures your data can't be edited, deleted, or tampered with. What’s recorded stays recorded.",
  },
  {
    icon: <CheckCircle className="h-12 w-12 text-[#33BBFF]" />,
    title: "Simple. Free. Fast.",
    description:
      "A clean, intuitive interface with zero gas fees on the Sepolia testnet. Submit, donate, and interact with ease.",
  },
];


export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the key benefits that make our platform stand out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex justify-center"
            >
              <Card className="w-full max-w-sm border bg-background/80 backdrop-blur-sm hover:shadow-lg transition-transform transform hover:scale-105">
                <CardHeader>
                  <motion.div 
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mb-4"
                  >
                    {reason.icon}
                  </motion.div>
                  <CardTitle className="text-xl">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                    {reason.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// UI Components
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`rounded-xl border bg-card text-card-foreground shadow ${className}`} {...props} />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`flex flex-col items-center space-y-2 p-6 ${className}`} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`font-semibold leading-none tracking-tight text-center ${className}`} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`text-sm text-muted-foreground text-center ${className}`} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
  )
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
