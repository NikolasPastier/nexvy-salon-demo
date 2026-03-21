"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface TestimonialAuthor {
  name: string;
  location: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({
  author,
  text,
  rating = 5,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        "w-[340px] shrink-0",
        "bg-[#141210] border border-[rgba(237,232,223,0.06)]",
        "p-8 rounded-2xl",
        "hover:border-[rgba(200,146,42,0.2)] hover:bg-[#1D1B17]",
        "transition-colors duration-300",
        className
      )}
    >
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} width="12" height="12" fill="#C8922A" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "20px",
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1.55,
          color: "#EDE8DF",
        }}
      >
        &ldquo;{text}&rdquo;
      </p>

      {/* Author */}
      <div
        className="flex items-center gap-3 mt-auto pt-4
                   border-t border-[rgba(237,232,223,0.06)]"
      >
        <Avatar className="h-9 w-9">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>
            {author.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: "#EDE8DF",
              margin: 0,
            }}
          >
            {author.name}
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: "#7A756C",
              margin: 0,
            }}
          >
            {author.location}
          </p>
        </div>
      </div>
    </div>
  );
}
