"use client";

import { Upload } from "lucide-react";
import { useAssignmentStore } from "@/store/assignmentStore";

export default function FileUpload() {
    const { setUploadedFile, assignment } = useAssignmentStore();

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0] || null;

        if (file) {
            setUploadedFile(file);
        }
    };

    return (
        <div
            className="border border-dashed border-[#D7D7D7] rounded-[20px] bg-[#FAFAFA]"
            style={{
                padding: "40px 20px",
            }}
        >
            <div className="flex flex-col items-center justify-center gap-3">
                <Upload size={24} color="#5E5E5E" />

                <div className="text-center">
                    <p className="text-[15px] font-medium text-[#303030]">
                        Choose a file or drag & drop it here
                    </p>

                    <p className="text-[12px] text-[#8B8B8B] mt-1">
                        JPEG, PNG, PDF up to 10MB
                    </p>
                </div>
                <label>
                    <input
                        type="file"
                        hidden
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                    />

                    <div
                        className="bg-white rounded-full cursor-pointer border border-[#E6E6E6]"
                        style={{
                            padding: "10px 18px",
                        }}
                    >
                        <p className="text-[13px] font-medium text-[#303030]">
                            Browse Files
                        </p>
                    </div>
                </label>
                {assignment.uploadedFile && (
                    <p className="text-[13px] text-[#FF7950] font-medium mt-2">
                        {assignment.uploadedFile.name}
                    </p>
                )}
            </div>
        </div>
    );
}