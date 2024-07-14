import { useStore } from "./store";

export default function UI() {
  const { boundary, setBoundary, cubesAmount, setCubesAmount } = useStore();
  return (
    <>
      <div className="absolute bottom-20 md:right-5 py-2 px-3 bg-neutral-800 w-11/12 md:w-96 flex gap-4 items-baseline shadow-md shadow-black/50 rounded">
        <label className="text-white" htmlFor="bounds-slider">
          boundary
        </label>
        <input
          id="bounds-slider"
          type="range"
          className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:-mt-0.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-in-out [&::-webkit-slider-thumb]:bg-neutral-700 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150 [&::-moz-range-thumb]:ease-in-out [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-neutral-700 [&::-moz-range-track]:w-full [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-gray-100 [&::-moz-range-track]:rounded-full"
          min="2"
          max="100"
          value={boundary}
          onInput={(e) => setBoundary(Number(e.currentTarget.value))}
        />
        <span className="text-white w-20 text-right" id="cubes-count">
          {boundary}
        </span>
      </div>
      <div className="absolute bottom-5 md:right-5 py-2 px-3 bg-neutral-800 w-11/12 md:w-96 flex gap-4 items-baseline shadow-md shadow-black/50 rounded">
        <label className="text-white" htmlFor="cubes-slider">
          cubes
        </label>
        <input
          id="cubes-slider"
          type="range"
          className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:-mt-0.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-in-out [&::-webkit-slider-thumb]:bg-neutral-700 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150 [&::-moz-range-thumb]:ease-in-out [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-neutral-700 [&::-moz-range-track]:w-full [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-gray-100 [&::-moz-range-track]:rounded-full"
          min="1"
          max="200000"
          value={cubesAmount}
          onInput={(e) => setCubesAmount(Number(e.currentTarget.value))}
        />
        <span className="text-white w-20 text-right" id="cubes-count">
          {cubesAmount}
        </span>
      </div>
    </>
  );
}
