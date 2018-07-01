package com.touchmark.briyani.commons;

public class Log {

	public static void log(String classname, String methodname, String message) {
		System.out.println(classname + " - " + methodname + " - " + message);
	}

	public static void log(String classname, String methodname, String message, Throwable ex) {
		System.out.println(classname + " - " + methodname + " - " + message);
		ex.printStackTrace();
	}

}
