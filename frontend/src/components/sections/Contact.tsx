import FadeUp from "@/components/animations/FadeUp";
import GridBackground from "@/components/effects/GridBackground";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#171717] py-28"
    >
      <GridBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

        <FadeUp>

          <div className="mx-auto max-w-3xl text-center">

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400">
              Contact Us
            </span>

            <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
              We'd Love To Hear
              <br />
              From You
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              Have questions, feedback, or partnership ideas?
              Send us a message and our team will get back to you as soon as possible.
            </p>

          </div>

        </FadeUp>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">

          {/* Contact Information */}

          <FadeUp delay={0.2}>

            <div className="space-y-8">

              <div className="rounded-3xl border border-white/10 bg-[#212121] p-8">

                <div className="flex items-center gap-4">

                  <Mail className="h-6 w-6 text-violet-400" />

                  <div>

                    <h3 className="font-semibold text-white">
                      Email
                    </h3>

                    <p className="text-zinc-400">
                      hrithik.prasad.personal@gmail.com
                    </p>

                  </div>

                </div>

              </div>

              <div className="rounded-3xl border border-white/10 bg-[#212121] p-8">

                <div className="flex items-center gap-4">

                  <MapPin className="h-6 w-6 text-violet-400" />

                  <div>

                    <h3 className="font-semibold text-white">
                      Location
                    </h3>

                    <p className="text-zinc-400">
                      India
                    </p>

                  </div>

                </div>

              </div>

              <div className="rounded-3xl border border-white/10 bg-[#212121] p-8">

                <div className="flex items-center gap-4">

                  <Clock className="h-6 w-6 text-violet-400" />

                  <div>

                    <h3 className="font-semibold text-white">
                      Response Time
                    </h3>

                    <p className="text-zinc-400">
                      Usually within 24 hours
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </FadeUp>

          {/* Contact Form */}

          <FadeUp delay={0.4}>

            <form className="rounded-3xl border border-white/10 bg-[#212121] p-8">

              <div className="space-y-6">

                <div>

                  <label className="mb-2 block text-sm text-zinc-300">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-violet-500"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm text-zinc-300">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-violet-500"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm text-zinc-300">
                    Message
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Write your message..."
                    className="w-full rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-violet-500"
                  />

                </div>

                <Button
                  className="w-full rounded-full"
                >
                  Send Message
                </Button>

              </div>

            </form>

          </FadeUp>

        </div>

      </div>
    </section>
  );
}