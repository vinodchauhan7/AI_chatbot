import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { pricingCards } from "@/constants/landing-page";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <NavBar />
      <section>
        <div className='flex flex-col justify-center md:items-center h-screen md:mt-[80px] w-full'>
          <div className="flex justify-between">
            <div className="flex flex-col items-center w-[600px] ld:w-full py-28">
              <span className="animate-pulse bg-blue-950 text-sm justify-center text-white py-2 px-4 rounded-full">
                An AI powered sales assistant chatbot
              </span>
              {/* <Image
                  src="/images/corinna-ai-logo.png"
                  width={500}
                  height={100}
                  alt="Logo"
                  className="animate-slide-in max-w-lg object-contain"
              /> */}
              <h1 className="text-6xl font-bold text-gray-900 md:flex overflow-hidden md:text-8xl md:mt-[80px]">
                NETBOT
              </h1>
              <p className="py-8 font-bold max-w-lg text-center">
              Your AI powered sales assistant! Embed NetBot AI into any website
              with just a snippet of code!
              </p>
            
              <Link href="/auth/sign-up">
                <Button className="bg-orange font-bold text-white px-4">
                    Start For Free
                </Button>
              </Link>
            </div>
            <div className="hidden overflow-hidden md:flex flex-col">
              <Image
                  src="/images/iphonecorinna.png"
                  width={400}
                  height={100}
                  alt="Logo"
                  className="max-w-lg object-contain animate-fadeInRight"
                />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col justify-center md:items-center item-center gap-4 md:mt-[100px]">
          <h2 className="text-center md:text-4xl md:pl-32 ml-30">
              Choose what fits you right
          </h2>
          <p className="text-muted-background text-center ld:max-w-lg md:pl-32 ml-30">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not ready to commit you can get started for free.
          </p>
        </div>
      </section>
      <div className="flex  justify-center gap-4 flex-wrap mt-6">
        {pricingCards.map((card) => (
          <Card
            key={card.title}
            className={clsx('w-[300px] flex flex-col justify-between bg-blue-950 text-white', {
              'border-2 border-primary': card.title === 'Unlimited',
            })}
          >
            <CardHeader>
              <CardTitle className="text-orange">{card.title}</CardTitle>
              <CardDescription>
                {pricingCards.find((c) => c.title === card.title)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">{card.price}</span>
              <span className="text-muted-foreground">
                <span>/ month</span>
              </span>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div>
                {card.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex gap-2"
                  >
                    <Check />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <Link
                href={`/dashbord?plan=${card.title}`}
                className="bg-orange border-orange border-2 p-2 w-full text-center font-bold rounded-md"
              >
                Get Started
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <section>
        <div className="flex justify-center gap-4 flex-wrap mt-6">
        <h2 className="text-2xl font-bold">Contact Us!</h2>
          <div className="flex gap-4 w-full h-40 bg-blue-950 text-white text-center">
            <div className="hidden md:flex md:w-[400px] items-center justify-between pl-6">
              <h3>Facebook</h3>
              <h3>Instagram</h3>
              <h3>Twitter</h3>
              <h3>Github</h3>
              <h3>Twitter</h3>
            </div>
            <div className="ld:w-full w-[600px] flex justify-between items-center md:my-3 py-7 px-10">
              <Input 
                type='email'
                placeholder="Enter your email"
                className="w-full text-black mx-5"
                key={'email'}
              />
              
              <Button >
                Email
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
