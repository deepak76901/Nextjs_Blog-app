import { Button } from "flowbite-react";
import Image from "next/image";


export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row border-2 border-teal-500 p-4 rounded-tl-3xl rounded-tr-none rounded-bl-none rounded-br-3xl justify-center items-center">
      <div className="flex flex-col flex-1 p-3">
        <h2 className="text-2xl">Want to learn more about Cricket?</h2>
        <p className="text-gray-500 m-2">Checkout these resources with 100 JavaScript projects</p>
        <Button gradientDuoTone="purpleToPink" className="rounded-bl-none ">
          <a
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            100 js projects
          </a>
        </Button>
      </div>
      <div className=" flex-1 p-3">
        <Image
          src="/ipl.jpg"
          alt="image"
          width={400}
          height={400}
          className="rounded-sm"
        />
      </div>
    </div>
  );
}
