import React from "react";
import { TextInput } from "../TextInput";
import { getNestedValue } from "../formHelpers";
import { Plus, X } from "lucide-react";

interface FaqSectionProps {
  formData: any;
  updateFormData: (path: string, value: any) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  formData,
  updateFormData,
}) => {
  const questions = getNestedValue(formData, "content.faq.questions") || [];

  const addQuestion = () => {
    const newQuestions = [...questions, {
      question: "",
      answer: ""
    }];
    updateFormData("content.faq.questions", newQuestions);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    updateFormData("content.faq.questions", newQuestions);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_: any, i: number) => i !== index);
    updateFormData("content.faq.questions", newQuestions);
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          FAQ Section
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Answer frequently asked questions
        </p>
      </div>

      <TextInput
        label="FAQ Title"
        value={getNestedValue(formData, "content.faq.title")}
        onChange={(value) => updateFormData("content.faq.title", value)}
        placeholder="Frequently Asked Questions"
        required
      />

      <TextInput
        label="FAQ Description"
        value={getNestedValue(formData, "content.faq.description")}
        onChange={(value) => updateFormData("content.faq.description", value)}
        placeholder="Find answers to common questions"
        multiline
        required
      />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium" style={{ color: "var(--text-secondary)" }}>
            Questions
          </h4>
          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center space-x-2 px-3 py-1 text-sm rounded-md transition-colors"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "var(--text-on-accent)",
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>

        <div className="space-y-4">
          {questions.map((faq: any, index: number) => (
            <div
              key={index}
              className="p-4 rounded-lg border space-y-4"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-secondary)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  FAQ {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="p-1 rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <TextInput
                label="Question"
                value={faq.question || ""}
                onChange={(value) => updateQuestion(index, "question", value)}
                placeholder="What is your refund policy?"
                required
              />

              <TextInput
                label="Answer"
                value={faq.answer || ""}
                onChange={(value) => updateQuestion(index, "answer", value)}
                placeholder="We offer a 30-day money-back guarantee..."
                multiline
                required
              />
            </div>
          ))}

          {questions.length === 0 && (
            <div
              className="text-center py-8 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              No questions added yet. Click "Add Question" to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
