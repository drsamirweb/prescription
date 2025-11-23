'use client';

import { Chamber } from '@/lib/chambers';

type Patient = { id: string; name: string; mobile?: string; age?: number };
type PrescriptionData = {
  chiefComplaints: string[];
  history: string[];
  examinations?: string[];
  diagnosis: string[];
  rx: string[];
  advice: string[];
  followUp: string[];
  referredTo: string[];
};

export default function PrintPrescription({ patient, data, chamber, serial, date }: { patient: Patient; data: PrescriptionData; chamber: Chamber; serial: string; date: string }) {
  return (
    <div className="print:block hidden">
      <div className="mx-auto w-[210mm] min-h-[297mm] bg-white p-6">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-3">
            {chamber.logo && <img src={chamber.logo} alt="logo" className="h-10" />}
            <div>
              <div className="text-xl font-semibold">{chamber.name}</div>
              <div className="text-xs">{chamber.clinic}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{chamber.doctor}</div>
            <div className="text-xs">{chamber.address}</div>
          </div>
        </div>

        <div className="text-xs mt-2 grid grid-cols-2">
          <div>Name: {patient.name}</div>
          <div className="text-right">Date: {new Date(date).toLocaleDateString()}</div>
          <div>ID: {patient.id || serial}</div>
          <div className="text-right">Age: {patient.age ?? ''}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="border-r pr-4">
            <Section title="Chief Complaint" bullets={data.chiefComplaints} />
            <Section title="History" bullets={data.history} />
            <Section title="On Examinations" bullets={data.examinations || []} />
            <Section title="Diagnosis" bullets={data.diagnosis} />
            <Section title="Investigation" bullets={[]} />
          </div>
          <div className="pl-4">
            <div className="text-lg font-semibold mb-2">Rx,</div>
            <ol className="list-decimal ml-5 text-sm space-y-1">
              {data.rx.map((r, i) => (
                <li key={i} className="border-b pb-1">{r}</li>
              ))}
            </ol>
            <div className="mt-4">
              <div className="font-medium">Advices</div>
              <ul className="list-disc ml-5 text-sm">
                {data.advice.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <div className="font-medium">Follow-up</div>
              <ul className="list-disc ml-5 text-sm">
                {data.followUp.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="text-[10px] mt-8 border-t pt-2">
          <div>{chamber.footer}</div>
          <div>{chamber.contacts.join(' , ')}</div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="mb-3">
      <div className="font-medium">{title}</div>
      <ul className="list-disc ml-5 text-sm">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
