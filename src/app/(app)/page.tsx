// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import messages from '@/messages.json';
// import Autoplay from "embla-carousel-autoplay";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"


// export default function Home() {
//   console.log(messages);


//   return (
//     <>
//       <main className="grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
//         <section className="text-center mb-8 md:mb-12">
//           <h1 className="text-3xl md:text-5xl font-bold">
//             Share Your Thoughts Without Revealing Your Identity
//           </h1>
//           <p className="mt-3 md:mt-4 text-base md:text-lg">
//             A safe space to express anything — without exposing who you are.
//           </p>
//         </section>
//         <Carousel
//           plugins={[
//             Autoplay({
//               delay: 2000,   // 2 seconds
//               stopOnInteraction: false,
//             }),
//           ]}
//           opts={{
//             align: "start",
//             loop: true,
//           }}
//           className="w-full max-w-lg md:max-w-xl"
//         >
//           <CarouselContent>
//             {messages.map((message, index) => (
//               <CarouselItem key={index} className="p-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>{message.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
//                     <Mail className="shrink-0" />
//                     <div>
//                       <p>{message.content}</p>
//                       <p className="text-xs text-muted-foreground">
//                         {message.received}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//         </Carousel>
//       </main>

//     </>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Lock, EyeOff, Zap, Shield, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import messages from '@/messages.json';
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative px-4 md:px-24 py-20 md:py-32">
          <div className="max-w-6xl mx-auto text-center">
            {/* Animated background dots */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl"></div>
              <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl"></div>
            </div>

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-300">100% Anonymous & Secure</span>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Speak Freely
                </span>
                <br />
                <span className="text-white">Stay Anonymous</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                Share your honest thoughts, ask questions, and express yourself without revealing your identity.
                Complete privacy guaranteed.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link href="/sign-up">
                  <Button 
                    size="lg" 
                    className="rounded-full px-8 py-6 text-lg bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 border-0 shadow-lg shadow-emerald-500/30"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Create Your Link — It&apos;s Free
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="rounded-full px-8 py-6 text-lg border-gray-600 hover:bg-gray-800"
                  >
                    <EyeOff className="mr-2 h-5 w-5" />
                    How It Works
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="text-center p-4 rounded-2xl bg-gray-800/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-emerald-400">100%</div>
                  <div className="text-gray-400">Anonymous</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-gray-800/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-cyan-400">24/7</div>
                  <div className="text-gray-400">Always Open</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-gray-800/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-emerald-400">Zero</div>
                  <div className="text-gray-400">Personal Data</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="px-4 md:px-24 py-16 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How <span className="text-emerald-400">SecretMessages</span> Works
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Get anonymous feedback in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-gray-800/50 border-gray-700 hover:border-emerald-500/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-emerald-400">1</span>
                  </div>
                  <CardTitle className="text-emerald-300">Create Your Link</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Sign up in seconds and get your unique, personalized message link.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-cyan-400">2</span>
                  </div>
                  <CardTitle className="text-cyan-300">Share With Anyone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Share your link on social media, with friends, or anywhere you want feedback.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 hover:border-emerald-500/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-emerald-400">3</span>
                  </div>
                  <CardTitle className="text-emerald-300">Receive Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Get honest, anonymous messages from anyone without knowing who sent them.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="px-4 md:px-24 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Real Messages From Real People
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                See what others are saying anonymously
              </p>
            </div>

            <div className="relative">
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 3000,
                    stopOnInteraction: false,
                  }),
                ]}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full max-w-4xl mx-auto"
              >
                <CarouselContent>
                  {messages.map((message, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-4">
                      <Card className="h-full bg-gray-800/50 border-gray-700 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                Anonymous
                              </span>
                            </CardTitle>
                            <Mail className="h-5 w-5 text-emerald-400" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 mb-4 italic">&ldquo;{message.content}&rdquo;</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {message.received}
                            </span>
                            <EyeOff className="h-4 w-4 text-gray-600" />
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-2 mt-8">
                  <CarouselPrevious className="relative static bg-gray-800 border-gray-700 hover:bg-gray-700" />
                  <CarouselNext className="relative static bg-gray-800 border-gray-700 hover:bg-gray-700" />
                </div>
              </Carousel>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 md:px-24 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-linear-to-br from-gray-800 to-gray-900 border-gray-700 p-8 md:p-12">
              <CardHeader>
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 mb-6">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Hear Honest Feedback?
                </CardTitle>
                <CardDescription className="text-lg text-gray-300">
                  Join thousands who use SecretMessages to get genuine, anonymous insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/sign-up" className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      className="w-full rounded-full py-6 text-lg bg-linear-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 border-0 shadow-lg shadow-emerald-500/30"
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Create Free Account
                    </Button>
                  </Link>
                  <Link href="/demo" className="w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full rounded-full py-6 text-lg border-gray-600 hover:bg-gray-800"
                    >
                      Try Demo First
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-gray-500 mt-6">
                  No credit card required • Free forever plan • 30-second setup
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}