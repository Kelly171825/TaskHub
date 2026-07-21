import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
const schema=z.object({title:z.string().min(2),projectId:z.string(),columnId:z.string().optional(),priority:z.enum(["LOW","MEDIUM","HIGH","URGENT"]).default("MEDIUM"),dueDate:z.string().datetime().optional()});
export async function GET(request:NextRequest){const projectId=request.nextUrl.searchParams.get("projectId"); return NextResponse.json(await prisma.task.findMany({where:projectId?{projectId}:undefined,include:{labels:{include:{label:true}},assignee:true,checklists:true},orderBy:{position:"asc"}}));}
export async function POST(request:NextRequest){const parsed=schema.safeParse(await request.json()); if(!parsed.success)return NextResponse.json({error:parsed.error.flatten()},{status:400}); const task=await prisma.task.create({data:{...parsed.data,dueDate:parsed.data.dueDate?new Date(parsed.data.dueDate):undefined}}); return NextResponse.json(task,{status:201});}
