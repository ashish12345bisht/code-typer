import { cases } from "../cases";
import type { Problem } from "../types";
import { javaChecks } from "./checks";

/** Helpers and node classes, as static members of Main so every problem can use them. */
const HEADER = String.raw`
import java.util.*;
import java.util.function.*;
import java.util.stream.*;
import java.io.*;

public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode() {}
        ListNode(int val) { this.val = val; }
        ListNode(int val, ListNode next) { this.val = val; this.next = next; }
    }

    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode() {}
        TreeNode(int val) { this.val = val; }
        TreeNode(int val, TreeNode left, TreeNode right) {
            this.val = val; this.left = left; this.right = right;
        }
    }

    static final Integer NIL = null;
    static int failures = 0;
    static String problem = "";
    static int checkNo = 0;

    static void check(boolean condition) {
        checkNo++;
        if (!condition) {
            failures++;
            System.out.println("FAIL " + problem + ": check #" + checkNo);
        }
    }

    static int[] arr(int... values) { return values; }
    static String[] strs(String... values) { return values; }
    static List<Integer> list(int... values) {
        List<Integer> out = new ArrayList<>();
        for (int v : values) out.add(v);
        return out;
    }
    static List<String> slist(String... values) { return new ArrayList<>(Arrays.asList(values)); }
    static List<List<Integer>> lists(int[]... rows) {
        List<List<Integer>> out = new ArrayList<>();
        for (int[] r : rows) out.add(list(r));
        return out;
    }
    static List<List<String>> slists(String[]... rows) {
        List<List<String>> out = new ArrayList<>();
        for (String[] r : rows) out.add(slist(r));
        return out;
    }
    static char[][] grid(String... rows) {
        char[][] g = new char[rows.length][];
        for (int i = 0; i < rows.length; i++) g[i] = rows[i].toCharArray();
        return g;
    }
    static <T extends Comparable<T>> List<T> sorted(List<T> values) {
        List<T> copy = new ArrayList<>(values);
        Collections.sort(copy);
        return copy;
    }
    static int[] sorted(int[] values) {
        int[] copy = values.clone();
        Arrays.sort(copy);
        return copy;
    }
    static <T extends Comparable<T>> List<List<T>> deepSorted(List<List<T>> values) {
        List<List<T>> out = new ArrayList<>();
        for (List<T> v : values) out.add(sorted(v));
        out.sort((a, b) -> {
            for (int i = 0; i < Math.min(a.size(), b.size()); i++) {
                int c = a.get(i).compareTo(b.get(i));
                if (c != 0) return c;
            }
            return Integer.compare(a.size(), b.size());
        });
        return out;
    }
    static List<List<Integer>> rows(int[][] matrix) {
        List<List<Integer>> out = new ArrayList<>();
        for (int[] r : matrix) out.add(list(r));
        return out;
    }
    static boolean near(double a, double b) { return Math.abs(a - b) < 1e-6; }

    static ListNode toList(int... values) {
        ListNode head = null;
        for (int i = values.length - 1; i >= 0; i--) head = new ListNode(values[i], head);
        return head;
    }
    static ListNode toCycle(int[] values, int pos) {
        ListNode head = toList(values);
        if (pos < 0) return head;
        ListNode tail = head, target = head;
        while (tail.next != null) tail = tail.next;
        for (int i = 0; i < pos; i++) target = target.next;
        tail.next = target;
        return head;
    }
    static List<Integer> fromList(ListNode head) {
        List<Integer> out = new ArrayList<>();
        for (; head != null; head = head.next) out.add(head.val);
        return out;
    }
    static TreeNode toTree(Integer... values) {
        if (values.length == 0 || values[0] == null) return null;
        TreeNode root = new TreeNode(values[0]);
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        int i = 1;
        while (!queue.isEmpty() && i < values.length) {
            TreeNode node = queue.poll();
            if (i < values.length && values[i] != null) queue.add(node.left = new TreeNode(values[i]));
            i++;
            if (i < values.length && values[i] != null) queue.add(node.right = new TreeNode(values[i]));
            i++;
        }
        return root;
    }
    static List<Integer> fromTree(TreeNode root) {
        List<Integer> out = new ArrayList<>();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            out.add(node == null ? null : node.val);
            if (node != null) {
                queue.add(node.left);
                queue.add(node.right);
            }
        }
        while (!out.isEmpty() && out.get(out.size() - 1) == null) out.remove(out.size() - 1);
        return out;
    }
    static List<Integer> tree(Integer... values) { return new ArrayList<>(Arrays.asList(values)); }

    static String captureOutput(Runnable fn) {
        PrintStream original = System.out;
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        System.setOut(new PrintStream(buffer, true));
        try {
            fn.run();
        } finally {
            System.setOut(original);
        }
        return buffer.toString().replace("\r\n", "\n");
    }

    // ---- Reflection-based checks from shared JSON test cases ----
    static String src;
    static int pos;

    static Object parseJson(String s) {
        src = s;
        pos = 0;
        return parseValue();
    }

    static void skipWs() {
        while (pos < src.length() && Character.isWhitespace(src.charAt(pos))) pos++;
    }

    static Object parseValue() {
        skipWs();
        char c = src.charAt(pos);
        if (c == '[') {
            pos++;
            List<Object> out = new ArrayList<>();
            skipWs();
            if (src.charAt(pos) == ']') { pos++; return out; }
            while (true) {
                out.add(parseValue());
                skipWs();
                if (src.charAt(pos++) == ']') return out;
            }
        }
        if (c == '"') {
            StringBuilder sb = new StringBuilder();
            pos++;
            while (src.charAt(pos) != '"') {
                char ch = src.charAt(pos++);
                if (ch != '\\') { sb.append(ch); continue; }
                char e = src.charAt(pos++);
                if (e == 'n') sb.append('\n');
                else if (e == 't') sb.append('\t');
                else if (e == 'u') { sb.append((char) Integer.parseInt(src.substring(pos, pos + 4), 16)); pos += 4; }
                else sb.append(e);
            }
            pos++;
            return sb.toString();
        }
        if (src.startsWith("true", pos)) { pos += 4; return true; }
        if (src.startsWith("false", pos)) { pos += 5; return false; }
        if (src.startsWith("null", pos)) { pos += 4; return null; }
        int start = pos;
        while (pos < src.length() && "+-0123456789.eE".indexOf(src.charAt(pos)) >= 0) pos++;
        String num = src.substring(start, pos);
        if (num.contains(".") || num.contains("e") || num.contains("E")) return Double.parseDouble(num);
        return Long.parseLong(num);
    }

    static int[] ints(Object v) {
        List<?> l = (List<?>) v;
        int[] out = new int[l.size()];
        for (int i = 0; i < out.length; i++) out[i] = ((Number) l.get(i)).intValue();
        return out;
    }

    static Integer[] boxed(Object v) {
        List<?> l = (List<?>) v;
        Integer[] out = new Integer[l.size()];
        for (int i = 0; i < out.length; i++) out[i] = l.get(i) == null ? null : ((Number) l.get(i)).intValue();
        return out;
    }

    /** JSON value to the Java type a solution's parameter expects. */
    static Object convert(Object v, java.lang.reflect.Type type, String io) {
        if (io.equals("list")) return toList(ints(v));
        if (io.equals("tree")) return toTree(boxed(v));
        if (io.equals("cycle")) {
            List<?> pair = (List<?>) v;
            return toCycle(ints(pair.get(0)), ((Number) pair.get(1)).intValue());
        }
        if (io.equals("lists")) {
            List<?> items = (List<?>) v;
            if (type == ListNode[].class) {
                ListNode[] out = new ListNode[items.size()];
                for (int i = 0; i < out.length; i++) out[i] = toList(ints(items.get(i)));
                return out;
            }
            List<ListNode> out = new ArrayList<>();
            for (Object x : items) out.add(toList(ints(x)));
            return out;
        }
        if (type == int.class || type == Integer.class) return ((Number) v).intValue();
        if (type == long.class || type == Long.class) return ((Number) v).longValue();
        if (type == double.class || type == Double.class) return ((Number) v).doubleValue();
        if (type == boolean.class || type == Boolean.class) return v;
        if (type == char.class || type == Character.class) return ((String) v).charAt(0);
        if (type == String.class) return v;
        if (type instanceof Class<?> cls && cls.isArray()) {
            Class<?> comp = cls.getComponentType();
            if (comp == char.class && v instanceof String s) return s.toCharArray();
            List<?> items = (List<?>) v;
            Object arr = java.lang.reflect.Array.newInstance(comp, items.size());
            for (int i = 0; i < items.size(); i++) {
                java.lang.reflect.Array.set(arr, i, convert(items.get(i), comp, "raw"));
            }
            return arr;
        }
        if (type instanceof java.lang.reflect.ParameterizedType pt) {
            java.lang.reflect.Type elem = pt.getActualTypeArguments()[0];
            List<Object> out = new ArrayList<>();
            for (Object x : (List<?>) v) out.add(convert(x, elem, "raw"));
            return out;
        }
        return v;
    }

    /** Any result to plain JSON-like values (Long, Double, String, Boolean, List, null). */
    static Object canon(Object v, String io) {
        if (io.equals("list")) return canon(fromList((ListNode) v), "raw");
        if (io.equals("tree")) return canon(fromTree((TreeNode) v), "raw");
        if (v == null) return null;
        if (v instanceof Integer || v instanceof Long || v instanceof Short || v instanceof Byte) {
            return ((Number) v).longValue();
        }
        if (v instanceof Number n) return n.doubleValue();
        if (v instanceof Character ch) return String.valueOf(ch);
        if (v.getClass().isArray()) {
            List<Object> out = new ArrayList<>();
            for (int i = 0; i < java.lang.reflect.Array.getLength(v); i++) {
                out.add(canon(java.lang.reflect.Array.get(v, i), "raw"));
            }
            return out;
        }
        if (v instanceof Collection<?> c) {
            List<Object> out = new ArrayList<>();
            for (Object x : c) out.add(canon(x, "raw"));
            return out;
        }
        return v;
    }

    static boolean same(Object a, Object b) {
        if (a == null || b == null) return a == b;
        if (a instanceof Number x && b instanceof Number y) return Math.abs(x.doubleValue() - y.doubleValue()) < 1e-6;
        if (a instanceof List<?> x && b instanceof List<?> y) {
            if (x.size() != y.size()) return false;
            for (int i = 0; i < x.size(); i++) if (!same(x.get(i), y.get(i))) return false;
            return true;
        }
        return a.equals(b);
    }

    static String key(Object v) {
        if (v instanceof Double d && d == Math.rint(d)) return String.valueOf(d.longValue());
        if (v instanceof List<?> l) {
            StringBuilder sb = new StringBuilder("[");
            for (Object x : l) sb.append(key(x)).append(',');
            return sb.append(']').toString();
        }
        return String.valueOf(v);
    }

    static List<Object> sortOuter(Object v) {
        List<Object> out = new ArrayList<>((List<?>) v);
        out.sort(Comparator.comparing(Main::key));
        return out;
    }

    static List<Object> sortDeep(Object v) {
        List<Object> out = new ArrayList<>();
        for (Object x : (List<?>) v) out.add(x instanceof List<?> ? sortOuter(x) : x);
        return sortOuter(out);
    }

    static java.lang.reflect.Method findMethod(Class<?> cls, String name, int params) throws NoSuchMethodException {
        for (java.lang.reflect.Method m : cls.getDeclaredMethods()) {
            if (m.getName().equals(name) && m.getParameterCount() == params) {
                m.setAccessible(true);
                return m;
            }
        }
        throw new NoSuchMethodException(cls.getSimpleName() + "." + name + "/" + params);
    }

    static Object[] convertAll(List<?> args, java.lang.reflect.Type[] types, List<?> ios) {
        Object[] out = new Object[args.size()];
        for (int i = 0; i < out.length; i++) {
            String io = i < ios.size() ? (String) ios.get(i) : "raw";
            out[i] = convert(args.get(i), types[i], io);
        }
        return out;
    }

    static void runCase(Class<?> cls, String nameJson, String argsJson, String expectedJson, String iosJson,
                        String resultIoJson, String unorderedJson, boolean inPlace) {
        String name = (String) parseJson(nameJson);
        List<?> args = (List<?>) parseJson(argsJson);
        Object expected = parseJson(expectedJson);
        List<?> ios = (List<?>) parseJson(iosJson);
        String resultIo = (String) parseJson(resultIoJson);
        String unordered = (String) parseJson(unorderedJson);
        try {
            java.lang.reflect.Method m = findMethod(cls, name, args.size());
            Object target = null;
            if (!java.lang.reflect.Modifier.isStatic(m.getModifiers())) {
                java.lang.reflect.Constructor<?> ctor = cls.getDeclaredConstructor();
                ctor.setAccessible(true);
                target = ctor.newInstance();
            }
            Object[] values = convertAll(args, m.getGenericParameterTypes(), ios);
            Object result = m.invoke(target, values);
            String firstIo = ios.isEmpty() ? "raw" : (String) ios.get(0);
            Object actual = inPlace ? canon(values[0], firstIo) : canon(result, resultIo);
            Object exp = canon(expected, "raw");
            if (unordered.equals("outer")) { actual = sortOuter(actual); exp = sortOuter(exp); }
            if (unordered.equals("deep")) { actual = sortDeep(actual); exp = sortDeep(exp); }
            check(same(actual, exp));
        } catch (java.lang.reflect.InvocationTargetException e) {
            throw new RuntimeException(e.getCause());
        } catch (ReflectiveOperationException e) {
            throw new RuntimeException(e);
        }
    }

    static void runDesign(Class<?> cls, String methodsJson, String paramsJson, String expectedJson) {
        List<?> methods = (List<?>) parseJson(methodsJson);
        List<?> params = (List<?>) parseJson(paramsJson);
        List<?> expected = (List<?>) parseJson(expectedJson);
        try {
            List<?> ctorArgs = (List<?>) params.get(0);
            java.lang.reflect.Constructor<?> ctor = null;
            for (java.lang.reflect.Constructor<?> c : cls.getDeclaredConstructors()) {
                if (c.getParameterCount() == ctorArgs.size()) ctor = c;
            }
            if (ctor == null) throw new NoSuchMethodException(cls.getSimpleName() + " constructor");
            ctor.setAccessible(true);
            Object obj = ctor.newInstance(convertAll(ctorArgs, ctor.getGenericParameterTypes(), List.of()));
            for (int k = 1; k < methods.size(); k++) {
                List<?> a = (List<?>) params.get(k);
                java.lang.reflect.Method m = findMethod(cls, (String) methods.get(k), a.size());
                Object r = m.invoke(obj, convertAll(a, m.getGenericParameterTypes(), List.of()));
                if (expected.get(k) != null) check(same(canon(r, "raw"), canon(expected.get(k), "raw")));
            }
        } catch (java.lang.reflect.InvocationTargetException e) {
            throw new RuntimeException(e.getCause());
        } catch (ReflectiveOperationException e) {
            throw new RuntimeException(e);
        }
    }

    static void run(String id, Runnable test) {
        problem = id;
        checkNo = 0;
        try {
            test.run();
        } catch (Throwable e) {
            failures++;
            System.out.println("FAIL " + id + ": " + e);
        }
    }
`;

/** Top-level classes in a solution become static nested classes of the problem's wrapper. */
function nest(code: string): string {
  return code.replace(/^((?:public |final |abstract )*)(class|interface|record|enum) /gm, "$1static $2 ");
}

/** One Main.java: each problem is a static nested class P<n> with its own test(). */
export function buildJava(problems: Problem[]): string {
  const parts = [HEADER];
  for (const p of problems) {
    const { code } = p.solutions.java;
    const checks = p.solutions.java.checks || (cases[p.id] ? javaChecks(cases[p.id], "Solution") : "");
    parts.push(
      `static class P${p.number} {`,
      nest(code),
      `static void test() {`,
      checks,
      `}`,
      `}`,
    );
  }
  parts.push(
    `public static void main(String[] args) {`,
    ...problems.map((p) => `    run(${JSON.stringify(p.id)}, P${p.number}::test);`),
    `    System.out.println("DONE failures=" + failures);`,
    `}`,
    `}`,
  );
  return parts.join("\n");
}
