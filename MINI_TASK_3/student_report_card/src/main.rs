use std::io;
use printpdf::*;
use std::fs::File;
use std::io::BufWriter;

fn calculate_average(total_marks: f64, subject_count: f64) -> f64 {
    total_marks / subject_count
}

fn assign_grade(avg: f64) -> &'static str {
    if avg >= 90.0 {
        "A"
    } else if avg >= 75.0 {
        "B"
    } else if avg >= 60.0 {
        "C"
    } else {
        "D"
    }
}

fn main() {
    let mut name = String::new();
    let mut total = String::new();
    let mut count = String::new();

    println!("Enter Student Name:");
    io::stdin().read_line(&mut name).unwrap();

    println!("Enter Total Marks:");
    io::stdin().read_line(&mut total).unwrap();

    println!("Enter Number of Subjects:");
    io::stdin().read_line(&mut count).unwrap();

    let name = name.trim();
    let total_marks: f64 = total.trim().parse().unwrap();
    let subject_count: f64 = count.trim().parse().unwrap();

    let avg = calculate_average(total_marks, subject_count);
    let grade = assign_grade(avg);

    println!("Generating Report Card...");

    let (doc, page1, layer1) = PdfDocument::new(
        "Student Report Card",
        Mm(210.0),
        Mm(297.0),
        "Layer 1",
    );

    let current_layer = doc.get_page(page1).get_layer(layer1);

    let font = doc
        .add_external_font(File::open("fonts/SANSKR.TTF").unwrap())
        .unwrap();

    let text = format!(
        "Student Report Card\n \n \n  \n  \nName: {}\n \n \n Total Marks: {}\n\n\nSubjects: {}\n\n\nAverage: {:.2}\n\n\nGrade: {}",
        name, total_marks, subject_count, avg, grade
    );

    current_layer.use_text(text, 14.0, Mm(20.0), Mm(270.0), &font);

    let output = File::create("report_card.pdf").unwrap();
    doc.save(&mut BufWriter::new(output)).unwrap();

    println!("✅ Report card saved as report_card.pdf");
}
