# js-web-scrapper
Web Scrapper built in JS to scrap repositories and its issues to store in a json format from Github.

Sample json file included. Data format below :

```javascript
[ 
  {
    "name": "ILSpy",
    "link": "https://github.com/icsharpcode/ILSpy",
    "issues": [
      {
        "name": "Notes for .NET 5 / .NET 6",
        "link": "https://github.com/icsharpcode/ILSpy/issues/2324"
      },
      {
        "name": "Incorrect deconstruction of foreach item",
        "link": "https://github.com/icsharpcode/ILSpy/issues/2322"
      }
    ]
   },
   {
    "name": "ml-agents",
    "link": "https://github.com/Unity-Technologies/ml-agents",
    "issues": [
      {
        "name": "In 3DBall project, code is different from github example explain page",
        "link": "https://github.com/Unity-Technologies/ml-agents/issues/5051"
      },
      {
        "name": "Running Examplar Scene",
        "link": "https://github.com/Unity-Technologies/ml-agents/issues/5050"
      }
     ]
   } 
]  
   ```
