"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [status, setStatus] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");

  // Load resumeUrl from localStorage on mount
  useEffect(() => {
    const savedUrl = localStorage.getItem("resumeUrl");
    if (savedUrl) setResumeUrl(savedUrl);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setStatus("");
    setAnalysis(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file.");
      return;
    }

    setStatus("Uploading to Cloudinary...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://fastapi-backend-z04m.onrender.com/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        const url = data?.data?.secure_url;
        setResumeUrl(url);
        localStorage.setItem("resumeUrl", url);
        setStatus("✅ Uploaded Successfully!");
        setActiveTab("analyze");
      } else {
        setStatus(data?.detail || "Upload failed.");
      }
    } catch (error) {
      setStatus("❌ Failed to upload: " + error.message);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeUrl) {
      setStatus("Please upload a resume first.");
      return;
    }
    if (!jobDescription.trim()) {
      setStatus("Please enter a job description.");
      return;
    }

    setStatus("Analyzing resume...");
    try {
      // Mock hardcoded response
      const mockResponse = {
        resume_name: resumeUrl.split("/").pop(),
        skills: { score: 82, reason: "Good match with JD keywords" },
        education: { score: 70, reason: "Sufficient academic background" },
        experience: { score: 90, reason: "Relevant industry experience" },
        job_role: { score: 85, reason: "Similar job role in past" },
        overall_score: 82,
        status: "shortlisted",
        final_reason: "Strong match across skills and experience",
      };

      setTimeout(() => {
        setAnalysis(mockResponse);
        setStatus("✅ Resume analyzed successfully!");
        localStorage.removeItem("resumeUrl");
        setResumeUrl("");
      }, 1000);
    } catch (err) {
      setStatus("❌ Analysis failed.");
      localStorage.removeItem("resumeUrl");
      setResumeUrl("");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl space-y-6 bg-white shadow-xl rounded-2xl p-8">
        {/* <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Resume Shortlister</h1>
          <p className="text-gray-600">Upload your resume and analyze its match with job descriptions</p>
          <Link
            href="/results"
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            View Previous Analyses →
          </Link>
        </div> */}

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "upload" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("upload")}
          >
            Upload Resume
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "analyze" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("analyze")}
            disabled={!resumeUrl}
          >
            Analyze Match
          </button>
        </div>

        {/* Upload Section */}
        {activeTab === "upload" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Select Resume (PDF/DOCX)</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">{file ? file.name : "PDF or DOCX (MAX. 5MB)"}</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <button
              onClick={handleUpload}
              disabled={!file}
              className={`w-full py-3 px-4 rounded-lg font-medium ${file ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"} transition-colors`}
            >
              Upload Resume
            </button>

            {status && (
              <div className={`p-3 rounded-lg text-sm ${status.includes("✅") ? "bg-green-100 text-green-800" : status.includes("❌") ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}>
                {status}
              </div>
            )}

            {/* {resumeUrl && (
              <div className="p-3 bg-gray-100 rounded-lg text-sm text-gray-700 break-all">
                <span className="font-medium">Uploaded resume:</span> {resumeUrl}
              </div>
            )} */}
          </div>
        )}

        {/* Analyze Section */}
        {activeTab === "analyze" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Job Description</label>
              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to analyze how well your resume matches..."
                style={{ color: 'black' }}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!jobDescription.trim()}
              className={`w-full py-3 px-4 rounded-lg font-medium ${jobDescription.trim() ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"} transition-colors`}
            >
              Analyze Match
            </button>

            {status && !analysis && (
              <div className={`p-3 rounded-lg text-sm ${status.includes("✅") ? "bg-green-100 text-green-800" : status.includes("❌") ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}>
                {status}
              </div>
            )}

            {/* Display Analysis */}
            {analysis && (
              <div className="space-y-4 border-t pt-4">
                <div className={`p-4 rounded-lg ${analysis.status === "shortlisted" ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"}`}>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {analysis.status === "shortlisted" ? "🎉 Strong Match!" : "🤔 Moderate Match"}
                    </h2>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold mr-2">{analysis.overall_score}%</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${analysis.overall_score > 75 ? "bg-green-600" : analysis.overall_score > 50 ? "bg-yellow-500" : "bg-red-500"}`}
                          style={{ width: `${analysis.overall_score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{analysis.final_reason}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        🧠
                      </div>
                      <h3 className="font-medium">Skills Match</h3>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold mr-2">{analysis.skills.score}%</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-blue-600"
                          style={{ width: `${analysis.skills.score}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{analysis.skills.reason}</p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                        🎓
                      </div>
                      <h3 className="font-medium">Education</h3>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold mr-2">{analysis.education.score}%</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-purple-600"
                          style={{ width: `${analysis.education.score}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{analysis.education.reason}</p>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                        💼
                      </div>
                      <h3 className="font-medium">Experience</h3>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold mr-2">{analysis.experience.score}%</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-amber-600"
                          style={{ width: `${analysis.experience.score}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{analysis.experience.reason}</p>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-2">
                        📌
                      </div>
                      <h3 className="font-medium">Job Role</h3>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold mr-2">{analysis.job_role.score}%</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-emerald-600"
                          style={{ width: `${analysis.job_role.score}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{analysis.job_role.reason}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}