import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { BlogsService } from "app/services/blog.service";
import { AddImgDialog } from "../common/add-img-dialog/add-img-dialog.component";

@Component({
  selector: "app-blog-view",
  templateUrl: "./blog-view.component.html",
  styleUrls: ["./blog-view.component.scss"],
})
export class BlogViewComponent implements OnInit {
  blog_id: any;
  isLoading: boolean = true;
  blogData: any;
  tinyMceConfig: any;

  thumbnail_img: any = "";
  main_img: any = "";

  blog_title: string = "";
  constructor(
    private readonly route: ActivatedRoute,
    private blogsService: BlogsService,
    public dialog: MatDialog
  ) {
    this.route.queryParams.subscribe((res) => {
      this.blog_id = res.id;
    });

    this.tinyMceConfig = {
      height: 500,
      // menubar: true,
      plugins: [
        "advlist",
        "autolink",
        "link",
        "image",
        "lists",
        "charmap",
        "preview",
        "anchor",
        "pagebreak",
        "searchreplace",
        "wordcount",
        "visualblocks",
        "code",
        "fullscreen",
        "insertdatetime",
        "media",
        "table",
        "emoticons",
        "template",
        "help",
      ],
      toolbar:
        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | " +
        "bullist numlist outdent indent | link image | print preview media fullscreen | " +
        "forecolor backcolor emoticons | help",
      // plugins: [
      //   "advlist autolink lists link image charmap print preview anchor",
      //   "searchreplace visualblocks code fullscreen",
      //   "insertdatetime media table paste code help wordcount",
      //   "tinycomments mentions codesample emoticons checklist mediaembed",
      //   "casechange export formatpainter pageembed permanentpen footnotes",
      //   "advtemplate advtable advcode editimage tableofcontents mergetags",
      //   "powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss textcolor",
      // ],
      // toolbar: `undo redo | blocks fontfamily fontsize | formatselect | bold italic backcolor forecolor underline strikethrough link |
      //           align checklist numlist bullist indent outdent | emoticons charmap |
      //           image media table mergetags | lineheight | tinycomments |
      //           removeformat`,
      menubar: "file edit view insert format tools table help",
      link_default_target: "_blank",
    };
  }

  ngOnInit() {
    this.blogsService
      .getBlogDetails(this.blog_id)
      .subscribe((res) => {
        console.log(res);
        this.blogData = res;
        this.thumbnail_img = `https://indusre.com/blogsimg/${res.blogs_thumbnail}`;
        this.main_img = `https://indusre.com/blogsimg/${res.blogs_mainimage}`;
      })
      .add(() => {
        this.isLoading = false;
      });
  }

  save() {
    console.log(this.blogData);
  }

  editImg(img, type): void {
    const dialogRef = this.dialog.open(AddImgDialog, {
      width: "40rem",
      height: "34rem",
      data: img,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (type == "thumbnail") {
        this.thumbnail_img = result.img;
      }else {
        this.main_img = result.img;
      }
    });
  }
}
