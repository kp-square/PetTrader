using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        [HttpPost]
        // api/upload
        public IActionResult UploadImage(IFormFile file)
        {
            Console.WriteLine(file.Length);
            if (file.Length > 2097152)
            {
                return BadRequest("file should be less than 2MB");
            }
            else if (file.Length > 0 && file.ContentType.Contains("image"))
            {
                string fileExtension = file.FileName.Split(".").Last();
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var fileName = Path.GetRandomFileName() + "." + fileExtension;
                var filePath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);

                using (var stream = System.IO.File.Create(filePath))
                {
                    file.CopyTo(stream);
                }
                return Ok(new { dbPath });

            }
            else
            {
                return BadRequest("uploaded file is invalid");
            }

        }

        // api/upload/multiple
        [HttpPost]
        [Route("multiple")]
        public IActionResult UploadMultiple()
        {
            var files = Request.Form.Files;
            if (files.Count > 0)
            {
                if (files.Count() <= 4)
                {
                    long size = files.Sum(f => f.Length);
                    var folderName = Path.Combine("Resources", "Images");
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                    List<string> images = new List<string>();
                    try
                    {
                        foreach (var file in files)
                        {
                            string fileExtension = file.FileName.Split(".").Last();
                            var fileName = Path.GetRandomFileName() + "." + fileExtension;
                            var filePath = Path.Combine(pathToSave, fileName);
                            var dbPath = Path.Combine(folderName, fileName);
                            images.Add(dbPath);

                            using (var stream = System.IO.File.Create(filePath))
                            {
                                file.CopyTo(stream);
                            }
                        }
                        Console.WriteLine(images);
                    }
                    catch (Exception)
                    {
                        return BadRequest();
                    }

                    return Ok(new { images });
                }
                else
                {
                    return BadRequest("Limit number of files to 4");
                }
            }
            else
            {
                return BadRequest("No files selected");
            }

        }
    }
}
