/**
 * Created by Leeyouje on 2020-11-24.
 */
public class TestJavaMain {
    public static void main(String[] args){

        int n = 1, i = 0, total = 0;

        while(i < 10){

            i = i +1;

            total = total + n;

            n = n + 1;

        }//while

        System.out.println(total);
    }
}
