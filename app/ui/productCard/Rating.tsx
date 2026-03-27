import { StarIcon } from "@heroicons/react/24/solid";

export default function Rating({
  stars,
  voters,
  reviewsString = false,
}: {
  stars: number;
  voters: number;
  reviewsString?: boolean;
}) {
  const STARS_ARRAY = new Array(5).fill("dummy");
  return (
    <p className="flex items-center">
      {STARS_ARRAY.map((_, i) => {
        return i < stars ? (
          <StarIcon key={i} className="text-yellow-star h-5 w-5" />
        ) : (
          <StarIcon key={i} className="h-5 w-5 opacity-40" />
        );
      })}
      <span className="ms-3 opacity-40">
        ({voters} {reviewsString ? "reviews" : null})
      </span>
    </p>
  );
}
