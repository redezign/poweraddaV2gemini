import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";

export async function GET(req: NextRequest) {
  try {
    const zip = new AdmZip();
    const rootDir = process.cwd();

    function addDirToZip(currentDir: string, zipPath: string) {
      const files = fs.readdirSync(currentDir);
      for (const file of files) {
        // Skip dependencies, build artifacts, hidden files, and environment key-value stores
        if (
          file === "node_modules" ||
          file === ".next" ||
          file === ".git" ||
          file === "dist" ||
          file === "out" ||
          file.startsWith(".env") ||
          file === "firebase-applet-config.json"
        ) {
          continue;
        }

        const fullPath = path.join(currentDir, file);
        const relativeZipPath = zipPath ? path.join(zipPath, file) : file;
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          addDirToZip(fullPath, relativeZipPath);
        } else {
          // If in directory, specify corresponding zipPath folder structure
          zip.addLocalFile(fullPath, zipPath);
        }
      }
    }

    addDirToZip(rootDir, "");

    const zipBuffer = zip.toBuffer();

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="poweradda-project-code.zip"',
        "Content-Length": zipBuffer.length.toString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to generate package backup: " + error.message },
      { status: 500 }
    );
  }
}
