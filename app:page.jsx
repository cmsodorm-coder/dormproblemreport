"use client";

import { useState } from "react";
import { Search, Wrench, CheckCircle2, Clock, XCircle, ShoppingCart, AlertCircle, Building2, MapPin, Tag } from "lucide-react";

export default function TicketTracker() {
  const [ticketInput, setTicketInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = ticketInput.trim();
    if (!query) return;

    setLoading(true);
    setErrorMsg("");
    setTicketData(null);

    const apiUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_API_URL;

    if (!apiUrl) {
      setErrorMsg("ระบบยังไม่ได้ตั้งค่า API URL กรุณาตรวจสอบ Environment Variables");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}?ticket=${encodeURIComponent(query)}`);
      const result = await res.json();

      if (result.status === "success") {
        setTicketData(result.data);
      } else {
        setErrorMsg(result.message || "ไม่พบข้อมูลหมายเลข Ticket นี้");
      }
    } catch (err) {
      setErrorMsg("ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (code) => {
    switch (code) {
      case "finished":
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
          badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
          borderAccent: "border-l-emerald-500",
        };
      case "maintenance":
        return {
          icon: <Wrench className="w-5 h-5 text-amber-600" />,
          badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
          borderAccent: "border-l-amber-500",
        };
      case "purchase":
        return {
          icon: <ShoppingCart className="w-5 h-5 text-purple-600" />,
          badgeClass: "bg-purple-100 text-purple-800 border-purple-300",
          borderAccent: "border-l-purple-500",
        };
      case "rejected":
        return {
          icon: <XCircle className="w-5 h-5 text-rose-600" />,
          badgeClass: "bg-rose-100 text-rose-800 border-rose-300",
          borderAccent: "border-l-rose-500",
        };
      case "received":
      default:
        return {
          icon: <Clock className="w-5 h-5 text-blue-600" />,
          badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
          borderAccent: "border-l-blue-500",
        };
    }
  };

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center justify-start">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Banner Header */}
        <div className="bg-[#007932] px-6 py-8 text-white text-center">
          <h1 className="text-2xl font-bold tracking-wide">ติดตามสถานะการแจ้งซ่อม</h1>
          <p className="text-emerald-100 text-sm mt-1">หน่วยกิจการนักศึกษาและงานอาคารสถานที่</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="p-6 border-b border-slate-100 bg-white">
          <label htmlFor="ticket" className="block text-sm font-semibold text-slate-700 mb-2">
            ระบุหมายเลข Ticket
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                id="ticket"
                type="text"
                placeholder="เช่น TK-001 หรือกรอกหมายเลขที่ได้รับทางอีเมล"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007932] focus:bg-white transition"
                required
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#007932] hover:bg-[#006028] disabled:bg-slate-400 text-white font-medium px-6 py-2.5 rounded-lg transition shadow-sm shrink-0"
            >
              {loading ? "กำลังค้นหา..." : "ตรวจสอบ"}
            </button>
          </div>

          {errorMsg && (
            <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </form>

        {/* Search Results Display */}
        {ticketData && (
          <div className="p-6 space-y-6 animate-in fade-in duration-300">
            {/* Status Card */}
            {(() => {
              const status = getStatusConfig(ticketData.statusCode);
              return (
                <div className={`p-4 bg-slate-50 border border-slate-200 border-l-4 ${status.borderAccent} rounded-lg flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    {status.icon}
                    <div>
                      <span className="text-xs text-slate-500 block uppercase font-medium">Ticket ID</span>
                      <span className="text-lg font-bold text-slate-900">#{ticketData.ticket}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${status.badgeClass}`}>
                    {ticketData.statusLabel}
                  </span>
                </div>
              );
            })()}

            {/* Ticket Information Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-sm bg-white">
              <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-slate-700 font-semibold">
                <Building2 className="w-4 h-4 text-[#007932]" />
                <span>ข้อมูลสถานที่</span>
              </div>
              <div className="p-4 space-y-2 border-b border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>หอพัก:</span>
                  <span className="font-medium text-slate-900">{ticketData.dorm || "-"}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ห้อง:</span>
                  <span className="font-medium text-slate-900">{ticketData.room || "-"}</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-slate-700 font-semibold">
                <Tag className="w-4 h-4 text-[#007932]" />
                <span>รายละเอียดการแจ้ง</span>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <span className="text-xs text-slate-500 block">หมวดหมู่</span>
                  <span className="font-medium text-slate-800">{ticketData.category || "-"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">รายการแจ้งซ่อม</span>
                  <span className="font-medium text-slate-800">{ticketData.title || "-"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">รายละเอียดเพิ่มเติม</span>
                  <p className="text-slate-700 whitespace-pre-wrap bg-slate-50 p-3 rounded-lg border border-slate-200 mt-1">
                    {ticketData.description || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Support Info */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-400">
                หากพบปัญหาหรือต้องการความช่วยเหลือเพิ่มเติม ติดต่อ LINE OA:
              </p>
              <p className="text-sm font-semibold text-[#007932] mt-0.5">@413hhyaf</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}