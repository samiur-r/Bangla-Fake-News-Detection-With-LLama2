import { useState } from "react";
import Metrics from "./Metrics";
import { Turnstile } from "@marsidev/react-turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const ChatForm = ({
  prompt,
  setPrompt,
  onSubmit,
  metrics,
  completion,
  disabled,
}) => {
  // Local state for the new fields
  const [nlpAssessment, setNlpAssessment] = useState("");
  const [blockchainEvaluatorsAssesment, setBlockchainEvaluatorsAssesment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (disabled) {
      return;
    }

    prompt = `Nlp Assesment: ${nlpAssessment}, Blockchain Evaluators Assesment: ${blockchainEvaluatorsAssesment}, News Article: ${prompt}`

    // Optionally validate here if needed, although the "required" attribute
    // on the inputs will prevent submission if they are empty.
    onSubmit(prompt);

    // Clear the fields after submission
    setPrompt("");
    setNlpAssessment("");
    setBlockchainEvaluatorsAssesment("");
    event.target.rows = 1;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <footer className="z-10 fixed bottom-0 left-0 right-0 bg-slate-100 border-t-2">
      <div className="container max-w-3xl mx-auto px-5 py-7">
        {/* <Metrics
          startedAt={metrics.startedAt}
          firstMessageAt={metrics.firstMessageAt}
          completedAt={metrics.completedAt}
          completion={completion}
        /> */}

        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <div className="flex gap-10">
            <input
              type="text"
              autoComplete="off"
              name="nlpAssessment"
              className="max-w-xl mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:leading-6"
              placeholder="Enter NLP Assessment, e.g: 80% Authentic"
              required
              value={nlpAssessment}
              onChange={(e) => setNlpAssessment(e.target.value)}
            />
            <input
              type="text"
              autoComplete="off"
              name="blockchainEvaluatorsAssesment"
              className="max-w-xl mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:leading-6"
              placeholder="Enter Blockchain Assesment, e.g: 60% fake"
              required
              value={blockchainEvaluatorsAssesment}
              onChange={(e) => setBlockchainEvaluatorsAssesment(e.target.value)}
            />
          </div>

          <div className="flex">
            <input
              autoComplete="off"
              autoFocus
              name="prompt"
              className="flex-grow block w-full rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:leading-6"
              placeholder="Share a news article"
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              onInput={(e) => {
                const lineCount = e.target.value.split("\n").length;
                e.target.rows = lineCount > 10 ? 10 : lineCount;
              }}
            />
            <button
              className="bg-gray-600 hover:bg-gray-800 items-center font-semibold text-white rounded-r-md px-5 py-3"
              type="submit"
              disabled={disabled}
            >
              Analyze
            </button>
          </div>
        </form>
      </div>
    </footer>
  );
};

export default ChatForm;
