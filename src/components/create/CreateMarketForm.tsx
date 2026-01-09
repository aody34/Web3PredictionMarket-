'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input, Textarea, Select } from '../ui/Input';
import { Card } from '../ui/Card';

interface CreateMarketFormProps {
    onSubmit?: (data: MarketFormData) => void;
    isLoading?: boolean;
}

export interface MarketFormData {
    question: string;
    description: string;
    category: string;
    outcomes: string[];
    endDate: string;
    endTime: string;
    initialLiquidity: string;
}

const categories = [
    { value: 'crypto', label: 'Crypto' },
    { value: 'politics', label: 'Politics' },
    { value: 'technology', label: 'Technology' },
    { value: 'science', label: 'Science' },
    { value: 'sports', label: 'Sports' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'other', label: 'Other' },
];

export function CreateMarketForm({ onSubmit, isLoading = false }: CreateMarketFormProps) {
    const [formData, setFormData] = useState<MarketFormData>({
        question: '',
        description: '',
        category: 'crypto',
        outcomes: ['Yes', 'No'],
        endDate: '',
        endTime: '',
        initialLiquidity: '',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof MarketFormData, string>>>({});
    const [step, setStep] = useState(1);

    const updateField = <K extends keyof MarketFormData>(field: K, value: MarketFormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const updateOutcome = (index: number, value: string) => {
        const newOutcomes = [...formData.outcomes];
        newOutcomes[index] = value;
        updateField('outcomes', newOutcomes);
    };

    const addOutcome = () => {
        if (formData.outcomes.length < 6) {
            updateField('outcomes', [...formData.outcomes, '']);
        }
    };

    const removeOutcome = (index: number) => {
        if (formData.outcomes.length > 2) {
            updateField('outcomes', formData.outcomes.filter((_, i) => i !== index));
        }
    };

    const validateStep = (currentStep: number): boolean => {
        const newErrors: Partial<Record<keyof MarketFormData, string>> = {};

        if (currentStep === 1) {
            if (!formData.question.trim()) newErrors.question = 'Question is required';
            if (formData.question.length > 200) newErrors.question = 'Question must be less than 200 characters';
            if (!formData.description.trim()) newErrors.description = 'Description is required';
        }

        if (currentStep === 2) {
            const validOutcomes = formData.outcomes.filter((o) => o.trim());
            if (validOutcomes.length < 2) {
                newErrors.outcomes = 'At least 2 outcomes are required';
            }
            if (new Set(validOutcomes.map((o) => o.toLowerCase())).size !== validOutcomes.length) {
                newErrors.outcomes = 'Outcomes must be unique';
            }
        }

        if (currentStep === 3) {
            if (!formData.endDate) newErrors.endDate = 'End date is required';
            if (!formData.endTime) newErrors.endTime = 'End time is required';

            const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
            if (endDateTime <= new Date()) {
                newErrors.endDate = 'End date must be in the future';
            }

            if (!formData.initialLiquidity || Number(formData.initialLiquidity) <= 0) {
                newErrors.initialLiquidity = 'Initial liquidity must be greater than 0';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step) && step < 3) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        if (validateStep(3) && onSubmit) {
            onSubmit(formData);
        }
    };

    // Calculate minimum date (tomorrow)
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    const minDateStr = minDate.toISOString().split('T')[0];

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-8">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${s === step
                                    ? 'bg-[var(--color-primary)] text-white'
                                    : s < step
                                        ? 'bg-[var(--color-success)] text-white'
                                        : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]'
                                }`}
                        >
                            {s < step ? (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                s
                            )}
                        </div>
                        {s < 3 && (
                            <div className={`w-16 h-0.5 ${s < step ? 'bg-[var(--color-success)]' : 'bg-[var(--bg-elevated)]'}`} />
                        )}
                    </div>
                ))}
            </div>

            <Card className="p-6">
                {/* Step 1: Question & Description */}
                {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
                                Create Your Market
                            </h2>
                            <p className="text-sm text-[var(--text-muted)]">
                                Define what you want to predict
                            </p>
                        </div>

                        <Input
                            label="Question"
                            placeholder="Will Bitcoin reach $100,000 by end of 2025?"
                            value={formData.question}
                            onChange={(e) => updateField('question', e.target.value)}
                            error={errors.question}
                            helperText={`${formData.question.length}/200 characters`}
                        />

                        <Textarea
                            label="Description"
                            placeholder="Provide clear resolution criteria and any relevant context..."
                            value={formData.description}
                            onChange={(e) => updateField('description', e.target.value)}
                            error={errors.description}
                            rows={4}
                        />

                        <Select
                            label="Category"
                            value={formData.category}
                            onChange={(e) => updateField('category', e.target.value)}
                            options={categories}
                        />
                    </div>
                )}

                {/* Step 2: Outcomes */}
                {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
                                Define Outcomes
                            </h2>
                            <p className="text-sm text-[var(--text-muted)]">
                                Add possible outcomes for your market (2-6)
                            </p>
                        </div>

                        <div className="space-y-3">
                            {formData.outcomes.map((outcome, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        placeholder={`Outcome ${index + 1}`}
                                        value={outcome}
                                        onChange={(e) => updateOutcome(index, e.target.value)}
                                    />
                                    {formData.outcomes.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => removeOutcome(index)}
                                            className="px-3 py-2 text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded-lg transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {errors.outcomes && (
                            <p className="text-sm text-[var(--color-error)]">{errors.outcomes}</p>
                        )}

                        {formData.outcomes.length < 6 && (
                            <button
                                type="button"
                                onClick={addOutcome}
                                className="flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Another Outcome
                            </button>
                        )}
                    </div>
                )}

                {/* Step 3: Timeline & Liquidity */}
                {step === 3 && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
                                Set Timeline & Liquidity
                            </h2>
                            <p className="text-sm text-[var(--text-muted)]">
                                When should this market resolve?
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="End Date"
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => updateField('endDate', e.target.value)}
                                error={errors.endDate}
                                min={minDateStr}
                            />
                            <Input
                                label="End Time"
                                type="time"
                                value={formData.endTime}
                                onChange={(e) => updateField('endTime', e.target.value)}
                                error={errors.endTime}
                            />
                        </div>

                        <Input
                            label="Initial Liquidity (ETH)"
                            type="number"
                            placeholder="0.1"
                            value={formData.initialLiquidity}
                            onChange={(e) => updateField('initialLiquidity', e.target.value)}
                            error={errors.initialLiquidity}
                            helperText="This ETH will seed the market's liquidity pool"
                            rightElement={<span className="text-sm text-[var(--text-muted)]">ETH</span>}
                        />

                        {/* Preview Card */}
                        <div className="mt-6 p-4 bg-[var(--bg-secondary)] rounded-xl">
                            <h4 className="text-sm font-medium text-[var(--text-secondary)] mb-3">Preview</h4>
                            <p className="text-[var(--text-primary)] font-medium mb-2">{formData.question || 'Your question'}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {formData.outcomes.filter(o => o.trim()).map((outcome, i) => (
                                    <span key={i} className="px-2.5 py-1 text-xs bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">
                                        {outcome}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                                <span>Category: {categories.find(c => c.value === formData.category)?.label}</span>
                                <span>•</span>
                                <span>
                                    Ends: {formData.endDate && formData.endTime
                                        ? new Date(`${formData.endDate}T${formData.endTime}`).toLocaleDateString()
                                        : 'Not set'}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-[var(--border-color)]">
                    {step > 1 ? (
                        <Button variant="ghost" onClick={handleBack}>
                            ← Back
                        </Button>
                    ) : (
                        <div />
                    )}

                    {step < 3 ? (
                        <Button onClick={handleNext}>
                            Next →
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} isLoading={isLoading}>
                            Create Market
                        </Button>
                    )}
                </div>
            </Card>
        </div>
    );
}
