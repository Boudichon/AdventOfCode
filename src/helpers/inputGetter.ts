export async function GetInput(year: number, day: number) {
    let input = "";
    try {
        input = await (await fetch(
            `/inputs/${year.toString()}/day${day.toString()}.txt`
        )).text();
    } catch (ex) {
        console.log("Error in fetch");
    }
    return input;
}