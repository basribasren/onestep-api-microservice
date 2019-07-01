#The 3 Types of Node.js Profilers You Should Know About
In coding, a profiler is a dynamic program analysis software that measures the efficacy, frequency and duration of function calls. These programs are capable of measuring the space, time complexity of a program and usage of particular instructions in order to optimize the program. Here are the `3 different types` of `Node.js profilers`, and what you should know about them:

##Standard Profilers
Standard sampling profilers help to give you a big picture idea of what’s working within your program and what isn’t. This technique monitors factors such as CPU, memory usage, time spent per line of code, and frequency of method calls.

These profilers consist of periodically recording stack traces of your application. With sampling, you can get a good idea of any bottlenecks and functionality issues existing within your app, covered in a number of metrics that help you streamline the debugging process
	
	Example (webstorm or v8)
https://nodejs.org/en/docs/guides/simple-profiling/
https://github.com/node-inspector/v8-profiler

##Tracing Profilers
Tracing profilers require developers to actively record tracing information by themselves directly into the code. These profilers find performance and application problems in a more exact manner.

Tracing profilers record all function calls and they are designed to reduce costs. These allow you to actively record tracing information by yourselves, directly into the code. There are several advantages to this method, although more information often results in more room for errors.
	
	Example (spy-js)

##APM (Application Performance Management) Tools
Application Performance Management (APM) tools are used for identifying and fixing application performance issues down to the line of code.
	
These types of profilers are designed to identify and solve Node.js application performance issues down to the line of code. These can show you every element of your code and its success from the end user experience to server monitoring. Plus, they can trace slow database queries, third party APIs, caching layers, background jobs and more.

	Examples (Trace, New Relic APM, or Retrace (Node.js support coming soon))

https://jiajizhou.com/2015/04/15/nodejs-profiling-tools.html
